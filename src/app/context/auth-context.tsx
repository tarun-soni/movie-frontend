// src/app/context/auth-context.tsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
  client: ApolloClient<NormalizedCacheObject>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, client }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check for user data in localStorage on mount
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    } else if (!pathname?.startsWith('/auth/')) {
      // If no valid session and not on auth pages, redirect to login
      router.replace('/auth/login');
    }
  }, [router, pathname]);

  // Prevent accessing protected routes when not authenticated
  useEffect(() => {
    const isAuthRoute = pathname?.startsWith('/auth/');
    if (!user && !isAuthRoute) {
      router.replace('/auth/login');
    } else if (user && isAuthRoute) {
      // If user is authenticated and tries to access auth routes, redirect to home
      router.replace('/home');
    }
  }, [user, router, pathname]);

  const login = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    router.replace('/home');
  };

  const logout = async () => {
    try {
      // Clear all auth-related storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.clear();

      // Reset Apollo cache
      await client.clearStore();

      setUser(null);

      router.replace('/auth/login');
      router.refresh(); // Force a full page refresh to clear any remaining state
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

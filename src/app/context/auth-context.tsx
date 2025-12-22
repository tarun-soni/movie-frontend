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

// Helper function to safely access localStorage
const getFromLocalStorage = (key: string): string | null => {
  if (typeof window !== 'undefined') {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error reading from localStorage for key ${key}:`, error);
      return null;
    }
  }
  return null;
};

const setToLocalStorage = (key: string, value: string): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error writing to localStorage for key ${key}:`, error);
    }
  }
};

const removeFromLocalStorage = (key: string): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage for key ${key}:`, error);
    }
  }
};

export function AuthProvider({ children, client }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check for user data in localStorage on mount
    const storedUser = getFromLocalStorage('user');
    const storedToken = getFromLocalStorage('token');

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        // Clear invalid data
        removeFromLocalStorage('user');
        removeFromLocalStorage('token');
      }
    }
    
    setIsInitialized(true);
  }, []);

  // Prevent accessing protected routes when not authenticated
  useEffect(() => {
    if (!isInitialized) return;

    const isAuthRoute = pathname?.startsWith('/auth/');
    if (!user && !isAuthRoute) {
      router.replace('/auth/login');
    } else if (user && isAuthRoute) {
      // If user is authenticated and tries to access auth routes, redirect to home
      router.replace('/home');
    }
  }, [user, router, pathname, isInitialized]);

  const login = (newUser: User) => {
    setUser(newUser);
    setToLocalStorage('user', JSON.stringify(newUser));
    router.replace('/home');
  };

  const logout = async () => {
    try {
      // Clear all auth-related storage
      removeFromLocalStorage('token');
      removeFromLocalStorage('user');
      
      if (typeof window !== 'undefined') {
        try {
          sessionStorage.clear();
        } catch (error) {
          console.error('Error clearing sessionStorage:', error);
        }
      }

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

'use client';

import { useState } from 'react';
import Input from '../input';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/auth-context';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '@/app/graphql/mutations';

export default function LoginForm() {
  const [email, setEmail] = useState('t2@gmail.com');
  const [password, setPassword] = useState('t2@1234');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const [loginUser, { loading }] = useMutation(LOGIN_USER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await loginUser({
        variables: { email, password },
      });

      const { token, ...userData } = data.login;
      login(token, userData);
      router.replace('/home');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
        {error && (
          <div className="text-sm text-red-500 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading || !email || !password}
          className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </>
  );
}

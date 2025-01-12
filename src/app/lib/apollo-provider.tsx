'use client';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AuthProvider } from '../context/auth-context';

const GRAPHQL_URL =
  process.env.NEXT_PUBLIC_NODE_ENV === 'development'
    ? 'http://localhost:4000/graphql'
    : 'https://next-movie-backend-jet.vercel.app/graphql';

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  credentials: 'include',
});

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider client={client}>{children}</AuthProvider>
    </ApolloProvider>
  );
}

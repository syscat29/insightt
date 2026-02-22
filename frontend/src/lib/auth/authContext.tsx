'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from './authClient';

type User = { id: string; name: string; email: string } | null;

type AuthContextValue = {
  user: User;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  refetch: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refetch = useCallback(async () => {
    const { data } = await authClient.getSession();
    setUser(data?.user ?? null);
  }, []);

  // Refetch the session and set the loading state
  useEffect(() => {
    let mounted = true;
    refetch().finally(() => {
      if (mounted) setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, [refetch]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      const { error } = await authClient.signIn.email({ email, password });
      if (error) return { error: error.message ?? 'Sign in failed' };
      await refetch();
      return {};
    },
    [refetch],
  );

  const signUp = useCallback(
    async (email: string, password: string, name: string) => {
      const { error } = await authClient.signUp.email({ email, password, name });
      if (error) return { error: error.message ?? 'Sign up failed' };
      await refetch();
      return {};
    },
    [refetch],
  );

  const signOut = useCallback(async () => {
    await authClient.signOut();
    setUser(null);
    router.push('/login');
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, refetch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

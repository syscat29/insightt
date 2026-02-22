'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/authContext';

export default function SignupPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await signUp(email, password, name);
    setLoading(false);
    if (result.error) setError(result.error);
    else router.push('/');
  }

  return (
    <div className='flex min-h-[80vh] items-center justify-center px-4'>
      <div className='w-full max-w-sm rounded-2xl border p-8 shadow-sm border-zinc-800 bg-zinc-900'>
        <h1 className='text-2xl font-semibold text-foreground'>Create account</h1>
        <p className='mt-1 text-sm text-zinc-400'>Sign up with your email and a password.</p>
        <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
          {error && <p className='rounded-lg px-3 py-2 text-sm bg-red-950 text-red-300'>{error}</p>}
          <div>
            <label htmlFor='name' className='block text-sm font-medium text-foreground'>
              Name
            </label>
            <input
              id='name'
              type='text'
              autoComplete='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className='mt-1 w-full rounded-lg border px-3 py-2 text-foreground focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 border-zinc-600 bg-zinc-800 placeholder-zinc-500'
            />
          </div>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-foreground'>
              Email
            </label>
            <input
              id='email'
              type='email'
              autoComplete='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='mt-1 w-full rounded-lg border px-3 py-2 text-foreground focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 border-zinc-600 bg-zinc-800 placeholder-zinc-500'
            />
          </div>
          <div>
            <label htmlFor='password' className='block text-sm font-medium text-foreground'>
              Password
            </label>
            <input
              id='password'
              type='password'
              autoComplete='new-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='mt-1 w-full rounded-lg border px-3 py-2 text-foreground focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 border-zinc-600 bg-zinc-800 placeholder-zinc-500'
            />
          </div>
          <button
            type='submit'
            disabled={loading}
            className='w-full rounded-lg bg-foreground py-2.5 text-sm font-medium text-background transition-colors hover:opacity-90 disabled:opacity-50'
          >
            {loading ? 'Creating account…' : 'Sign up'}
          </button>
        </form>
        <p className='mt-6 text-center text-sm text-zinc-400'>
          Already have an account?{' '}
          <Link href='/login' className='font-medium text-foreground underline underline-offset-2'>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

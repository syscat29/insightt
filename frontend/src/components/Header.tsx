'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth/authContext';

export function Header() {
  const { user, loading, signOut } = useAuth();

  return (
    <header className='sticky top-0 z-10 border-b backdrop-blur border-zinc-800 bg-zinc-950/80'>
      <div className='mx-auto flex h-14 max-w-5xl items-center justify-between px-4'>
        <Link href='/' className='font-semibold text-foreground'>
          Insightt
        </Link>
        <nav className='flex items-center gap-4'>
          {loading ? (
            <span className='text-sm text-zinc-400'>…</span>
          ) : user ? (
            <button
              type='button'
              onClick={() => signOut()}
              className='text-sm font-medium text-zinc-400 hover:text-zinc-100'
            >
              Sign out
            </button>
          ) : (
            <>
              <Link href='/login' className='text-sm font-medium text-zinc-400 hover:text-zinc-100'>
                Sign in
              </Link>
              <Link
                href='/signup'
                className='rounded-lg bg-foreground px-3 py-1.5 text-sm font-medium text-background'
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

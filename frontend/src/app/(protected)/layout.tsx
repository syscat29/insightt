import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/server';

export default async function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getSession();
  if (!user) redirect('/login');

  return <>{children}</>;
}

import type { Context, Next } from 'hono';
import { auth } from '@/providers/auth.provider';

export async function requireAuth(c: Context, next: Next) {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set('user', null);
    c.set('session', null);
    await next();
    return;
  }

  c.set('user', session.user);
  c.set('session', session.session);
  await next();
}

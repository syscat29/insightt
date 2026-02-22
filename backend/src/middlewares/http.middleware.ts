import { AppBindings } from '@/lib/types';
import { Hono } from 'hono';

export function applyHttpMiddleware(app: Hono<AppBindings>): void {
  app.use('*', async (c, next) => {
    c.res.headers.set('Content-Type', 'application/json');
    await next();
  });
}

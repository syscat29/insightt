import { AppBindings } from '@/lib/types';
import { Hono } from 'hono';
import { taskRouter } from './task.router';
import { auth } from '@/providers/auth.provider';
class ServerRouter {
  private readonly router = new Hono<AppBindings>();

  getRoutes(): Hono<AppBindings> {
    // Auth handler
    this.router.on(['POST', 'GET'], '/auth/*', (c) => auth.handler(c.req.raw));

    // Basic route
    this.router.get('/', (c) => {
      return c.json({ message: 'Insightt API!' });
    });

    // Task routes
    this.router.route('/tasks', taskRouter.getRoutes());

    return this.router;
  }
}

export const serverRouter = new ServerRouter();

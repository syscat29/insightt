import { Hono } from 'hono';
import { serve } from 'bun';
import { AppBindings } from '@/lib/types';
import { serverRouter } from '@/routes/index.router';
import { logger } from 'hono/logger';
import cors from '@/middlewares/cors.middleware';
import { requireAuth } from '@/middlewares/auth.middleware';

class Server {
  public port: number;
  public server: Hono<AppBindings>;

  constructor() {
    this.port = Number(process.env.APP_PORT) || 5600;
    this.server = new Hono<AppBindings>();
    this.routes();
  }

  private routes() {
    // Middlewares
    this.server.use('*', cors);
    this.server.use('*', requireAuth);
    this.server.use('*', logger());

    // API routes
    this.server.route('/api', serverRouter.getRoutes());
  }

  async start() {
    serve({
      fetch: this.server.fetch,
      port: this.port,
    });
    console.log(`Server started on port ${this.port}`);
  }
}

export const serverProvider = new Server();

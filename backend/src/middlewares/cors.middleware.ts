import { cors } from 'hono/cors';

export default cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'],
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
});

import 'dotenv/config';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as authSchema from '../models/user.model';
import * as taskSchema from '../models/task.model';

const client = postgres(process.env.DATABASE_URL!);

export const db = drizzle({
  client,
  schema: { ...authSchema, ...taskSchema },
});

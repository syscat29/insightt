import z from 'zod';

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string().default('3000'),
  DATABASE_URL: z.url(),
  AUTH_URL: z.url(),
  AUTH_SECRET: z.string(),
});

export type Environment = z.infer<typeof EnvSchema>;

export interface AppBindings {
  Bindings: Environment;
  Variables: {
    user: any;
    session: any;
  };
}

export type AuthVariables = {
  user: { id: string; name: string; email: string };
  session: unknown;
};

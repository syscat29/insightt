import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { user } from './user.model';

export const taskStatus = pgEnum('task_status', [
  'PENDING',
  'IN_PROGRESS',
  'DONE',
  'ARCHIVED',
]);

export const task = pgTable('task', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  status: taskStatus('status').notNull().default('PENDING'),
  ownerId: text('ownerId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Relations
export const taskRelations = relations(task, ({ one }) => ({
  owner: one(user, {
    fields: [task.ownerId],
    references: [user.id],
  }),
}));

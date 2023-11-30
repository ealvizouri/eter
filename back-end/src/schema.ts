import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const Products = sqliteTable('products', {
  id: text('id').notNull().unique(),
  created_at: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  quantity: integer('active').notNull().default(0),
  name: text('name').notNull(),
  image: text('image')
});

export const Users = sqliteTable('usuarios',{
  id: text('id').notNull().unique(),
  name: text('name').notNull(),
  mail: text('mail').notNull(),
  password: text('password').notNull()
});
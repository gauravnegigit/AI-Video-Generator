import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits: integer().notNull().default(2),
});

export const coursesTable = pgTable("courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer().notNull(),
  courseId: varchar({ length: 255 }).notNull().unique(),
  courseName: varchar({ length: 255 }).notNull(),
  userInput: varchar({ length: 1024 }).notNull(),
  type: varchar({ length: 100 }).notNull(),
  courseLayout: varchar({ length: 2048 }).notNull(),
});
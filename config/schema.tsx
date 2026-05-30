import { integer, pgTable, varchar , timestamp} from "drizzle-orm/pg-core";
import {z} from 'zod';

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits: integer().notNull().default(2),
});

export const coursesTable = pgTable("courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar({ length: 255 }).notNull().references(() => usersTable.email),
  courseId: varchar({ length: 255 }).notNull().unique(),
  courseName: varchar({ length: 255 }).notNull(),
  userInput: varchar({ length: 1024 }).notNull(),
  type: varchar({ length: 100 }).notNull(),
  courseLayout: varchar({ length: 2048 }).notNull(),
  createdAt : timestamp().defaultNow(),
});

export const ChapterSchema = z.object({
  ChapterId: z.string(),
  chapterTitle: z.string(),
  subContent: z.array(z.string()),
});

export const courseLayoutSchema = z.object({
  courseName: z.string(),
  courseDescription: z.string(),
  courseId: z.string(),
  level: z.string(),
  totalChapters: z.number(),
  chapters: z.array(ChapterSchema),
});

export const CourseSchema = z.object({
  courseId: z.string(),
  courseName: z.string(),
  type: z.string(),
  createdAt: z.string(),
  id: z.number(),
  courseLayout: courseLayoutSchema,
});

export type Course = z.infer<typeof CourseSchema>;
export type courseLayout = z.infer<typeof courseLayoutSchema>;
export type Chapter = z.infer<typeof ChapterSchema>;
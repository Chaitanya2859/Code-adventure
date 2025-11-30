import { integer, pgTable, varchar, json } from "drizzle-orm/pg-core";


export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  points: integer().default(0),
  subscription: varchar()
});

export const courseTable = pgTable("courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  courseId: integer().notNull().unique(),
  title: varchar({ length: 255 }).notNull().unique(),
  desc: varchar({ length: 255 }).notNull(),
  banner: varchar({ length: 255 }).notNull(),
  difficulty: varchar().default('Beginner')
});

export const chapterTable = pgTable("chapters", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  courseId: integer().notNull(),
  title: varchar().notNull(),
  desc: varchar().notNull(),
  exercises: json(),
  chapterId: integer()
});

export const completedExerciseTable = pgTable("completedExercise", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  courseId: integer().notNull(),
  chapterId: integer().notNull(),
  exerciseId: integer().notNull(),
  userId: varchar(),
});



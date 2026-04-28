import { integer, pgTable, varchar, json, timestamp, boolean } from "drizzle-orm/pg-core";


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
  difficulty: varchar().default('Beginner'),
  free: boolean().default(false)
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
  chapterId: integer(),
  exerciseId: varchar().notNull(),
  userId: varchar(),
});


export const enrolledCourseTable = pgTable("enrolledCourse", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  courseId: integer(),
  enrolledDate: timestamp().defaultNow(),
  userId: varchar(),
  xpEarned: integer(),
});

export const postsTable = pgTable("posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar().notNull(),
  authorName: varchar().notNull(),
  avatar: varchar(),
  title: varchar().notNull(),
  content: varchar().notNull(),
  createdAt: timestamp().defaultNow(),
});

export const votesTable = pgTable("votes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  postId: integer().notNull(),
  userId: varchar().notNull(),
  type: varchar().notNull(), // 'up' or 'down'
});

export const commentsTable = pgTable("comments", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  postId: integer().notNull(),
  userId: varchar().notNull(),
  authorName: varchar().notNull(),
  content: varchar().notNull(),
  createdAt: timestamp().defaultNow(),
});

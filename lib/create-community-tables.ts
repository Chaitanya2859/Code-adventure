import 'dotenv/config';
import { db } from "../config/db";
import { sql } from "drizzle-orm";

async function createTables() {
  console.log("Creating community tables manually...");

  try {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        "userId" VARCHAR NOT NULL,
        "authorName" VARCHAR NOT NULL,
        avatar VARCHAR,
        title VARCHAR NOT NULL,
        content VARCHAR NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("Created posts table.");

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS votes (
        id SERIAL PRIMARY KEY,
        "postId" INTEGER NOT NULL,
        "userId" VARCHAR NOT NULL,
        type VARCHAR NOT NULL
      );
    `);
    console.log("Created votes table.");

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        "postId" INTEGER NOT NULL,
        "userId" VARCHAR NOT NULL,
        "authorName" VARCHAR NOT NULL,
        content VARCHAR NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("Created comments table.");

    console.log("Done.");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}

createTables();

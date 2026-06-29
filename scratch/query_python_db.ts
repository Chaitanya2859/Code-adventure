import 'dotenv/config';
import { db } from "../config/db";
import { chapterTable } from "../config/userschema";
import { eq } from "drizzle-orm";

async function run() {
  try {
    const chapters = await db.select().from(chapterTable).where(eq(chapterTable.courseId, 5));
    for (const chapter of chapters) {
      console.log(`\nChapter: ${chapter.title} (ID: ${chapter.chapterId})`);
      console.log(JSON.stringify(chapter.exercises, null, 2));
    }
  } catch (err) {
    console.error(err);
  }
}

run();

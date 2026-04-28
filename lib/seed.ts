import 'dotenv/config';
import { db } from "../config/db";
import { courseTable, chapterTable } from "../config/userschema";
import { eq, inArray, notInArray } from "drizzle-orm";

const coursesToKeep = [
  {
    courseId: 1,
    title: "HTML",
    desc: "Learn the fundamentals of HTML and build the structure of modern web pages.",
    banner: "https://www.codedex.io/images/html/html-parralax-combined.gif",
    difficulty: "Beginner",
    free: true
  },
  {
    courseId: 2,
    title: "CSS",
    desc: "Master CSS to style and design responsive, visually appealing web layouts.",
    banner: "https://www.codedex.io/images/css/css-course-banner.gif",
    difficulty: "Intermediate",
    free: true
  },
  {
    courseId: 6,
    title: "JavaScript",
    desc: "Explore JavaScript topics such as closures, prototypes, async programming, and modern ES6+ features.",
    banner: "/hero10.gif",
    difficulty: "Intermediate",
    free: false
  },
  {
    courseId: 3,
    title: "React",
    desc: "Build dynamic and interactive web applications using the React JavaScript library.",
    banner: "/hero13.gif",
    difficulty: "Advanced",
    free: false
  },
  {
    courseId: 5,
    title: "Python",
    desc: "Understand the core concepts of Python and start building interactive features on the web.",
    banner: "https://www.codedex.io/images/python/python-animated.gif",
    difficulty: "Beginner",
    free: false
  },
  {
    courseId: 7,
    title: "Node.js",
    desc: "Learn backend development using Node.js and build scalable, high-performance server applications.",
    banner: "/hero14.gif",
    difficulty: "Advanced",
    free: false
  }
];

async function seed() {
  console.log("Starting database sync...");

  try {
    // 1. Delete courses not in the list
    const keepIds = coursesToKeep.map(c => c.courseId);
    await db.delete(courseTable).where(notInArray(courseTable.courseId, keepIds));
    console.log("Removed extra courses.");

    // 2. Upsert courses
    for (const course of coursesToKeep) {
      const existing = await db.select().from(courseTable).where(eq(courseTable.courseId, course.courseId));
      
      if (existing.length > 0) {
        await db.update(courseTable).set(course).where(eq(courseTable.courseId, course.courseId));
        console.log(`Updated course: ${course.title}`);
      } else {
        await db.insert(courseTable).values(course);
        console.log(`Inserted course: ${course.title}`);
      }
    }

    console.log("Database sync completed successfully!");
  } catch (error) {
    console.error("Error during database sync:", error);
  }
}

seed();

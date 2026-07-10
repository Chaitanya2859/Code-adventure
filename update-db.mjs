import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function main() {
  try {
    // Update courseId from 6 to 3 for JavaScript course
    const res = await pool.query('UPDATE courses SET "courseId" = 3 WHERE "courseId" = 6');
    console.log('Updated rows:', res.rowCount);
    // Also update any enrolledCourse and completedExercise rows
    const r2 = await pool.query('UPDATE "enrolledCourse" SET "courseId" = 3 WHERE "courseId" = 6');
    console.log('Updated enrolledCourse rows:', r2.rowCount);
    const r3 = await pool.query('UPDATE "completedExercise" SET "courseId" = 3 WHERE "courseId" = 6');
    console.log('Updated completedExercise rows:', r3.rowCount);
  } catch (e) {
    console.error('Error:', e);
  } finally {
    await pool.end();
  }
}
main();

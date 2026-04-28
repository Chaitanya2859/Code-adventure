import 'dotenv/config';
import { db } from '../config/db';
import { sql } from 'drizzle-orm';

async function addColumn() {
  try {
    await db.execute(sql`ALTER TABLE courses ADD COLUMN IF NOT EXISTS free BOOLEAN DEFAULT false`);
    console.log('Column added successfully');
  } catch (e) {
    console.error(e);
  }
}

addColumn();

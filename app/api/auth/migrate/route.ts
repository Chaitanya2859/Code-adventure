import pool from '@/config/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await pool.query(`
      ALTER TABLE users
        ADD COLUMN IF NOT EXISTS password VARCHAR,
        ADD COLUMN IF NOT EXISTS avatar VARCHAR
    `);
    return NextResponse.json({ success: true, message: 'Migration applied: password and avatar columns added to users table.' });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: 'Migration failed', details: e.message }, { status: 500 });
  }
}

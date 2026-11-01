import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import pool from '@/config/db';

export async function GET() {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ user: null, userDetail: null }, { status: 401 });
  }

  try {
    const existing = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [user.email]
    );

    if (existing.rows.length > 0) {
      return NextResponse.json({ user, userDetail: existing.rows[0] });
    }

    const created = await pool.query(
      `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`,
      [user.name, user.email]
    );
    return NextResponse.json({ user, userDetail: created.rows[0] });
  } catch (error) {
    console.error('Error fetching user detail in auth/me:', error);
    return NextResponse.json({ user, userDetail: null });
  }
}

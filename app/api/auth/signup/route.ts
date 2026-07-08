import pool from '@/config/db';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { signJwt, buildSessionCookie, SessionUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    // Check if email already exists
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insert new user
    const result = await pool.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, avatar`,
      [name.trim(), email.toLowerCase().trim(), hashedPassword]
    );

    const user = result.rows[0] as SessionUser;
    const token = await signJwt(user);

    const response = NextResponse.json({ success: true, user });
    response.headers.set('Set-Cookie', buildSessionCookie(token));
    return response;
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: 'Signup failed', details: e.message }, { status: 500 });
  }
}

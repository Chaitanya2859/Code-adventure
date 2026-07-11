import pool from '@/config/db';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { signJwt, buildSessionCookie, SessionUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Find user by email
    const result = await pool.query(
      'SELECT id, name, email, password, avatar FROM users WHERE email = $1',
      [email.toLowerCase().trim()]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const user = result.rows[0];

    // Check if account has a password
    if (!user.password) {
      return NextResponse.json({
        error: 'This account was created with a social login. Please set a password first.'
      }, { status: 401 });
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const sessionUser: SessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    };

    const token = await signJwt(sessionUser);
    const response = NextResponse.json({ success: true, user: sessionUser });
    response.headers.set('Set-Cookie', buildSessionCookie(token));
    return response;
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: 'Sign in failed', details: e.message }, { status: 500 });
  }
}

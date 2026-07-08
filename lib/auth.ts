import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'change-this-secret-in-production'
);

const COOKIE_NAME = 'session';
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 7, // 7 days
};

export interface SessionUser {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

/**
 * Sign a JWT token with user payload
 */
export async function signJwt(user: SessionUser): Promise<string> {
  return new SignJWT({ ...user })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

/**
 * Verify a JWT token and return the decoded payload
 */
export async function verifyJwt(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as SessionUser;
  } catch {
    return null;
  }
}

/**
 * Get current session from cookie (for use in Server Components and API Routes)
 * Works with next/headers cookies() helper
 */
export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyJwt(token);
  } catch {
    return null;
  }
}

/**
 * Get current session from a NextRequest object (for use in middleware or API routes with req)
 */
export async function getSessionFromRequest(req: NextRequest): Promise<SessionUser | null> {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyJwt(token);
}

/**
 * Build cookie headers for setting or clearing the session cookie
 */
export function buildSessionCookie(token: string): string {
  const opts = COOKIE_OPTIONS;
  return `${COOKIE_NAME}=${token}; Path=${opts.path}; Max-Age=${opts.maxAge}; HttpOnly; SameSite=${opts.sameSite}${opts.secure ? '; Secure' : ''}`;
}

export function buildClearCookie(): string {
  return `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; SameSite=lax`;
}

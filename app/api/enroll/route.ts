import pool from "@/config/db";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { courseId } = await req.json();
    const authUser = await getSession();
    const email = authUser?.email ?? '';

    if (!email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [courseResult, userResult] = await Promise.all([
        pool.query(`SELECT * FROM courses WHERE "courseId" = $1`, [Number(courseId)]),
        pool.query(`SELECT plan FROM users WHERE email = $1`, [email])
    ]);

    if (courseResult.rows.length === 0) {
        return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const course = courseResult.rows[0];
    const userPlan = userResult.rows[0]?.plan || 'Explorer';
    const isPaidCourse = Number(courseId) === 3 || course.free === false;

    if (isPaidCourse && userPlan !== 'Adventurer' && userPlan !== 'Legend') {
        return NextResponse.json(
            { error: "JavaScript is a premium course available exclusively on the Adventurer and Legend packs. Please upgrade your plan." },
            { status: 403 }
        );
    }

    const existing = await pool.query(
        `SELECT * FROM "enrolledCourse" WHERE "courseId" = $1 AND "userId" = $2`,
        [Number(courseId), email]
    );

    if (existing.rows.length > 0) {
        return NextResponse.json(existing.rows);
    }

    const result = await pool.query(
        `INSERT INTO "enrolledCourse" ("courseId", "userId", "xpEarned") VALUES ($1, $2, $3) RETURNING *`,
        [Number(courseId), email, 0]
    );

    return NextResponse.json(result.rows);
}

export async function GET(req: NextRequest) {
    const authUser = await getSession();
    const email = authUser?.email ?? '';
    
    if (!email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await pool.query(
        `SELECT c.*, e."xpEarned" FROM "enrolledCourse" e JOIN courses c ON e."courseId" = c."courseId" WHERE e."userId" = $1`,
        [email]
    );

    return NextResponse.json(result.rows);
}
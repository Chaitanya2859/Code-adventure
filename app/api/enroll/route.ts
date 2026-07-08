import pool from "@/config/db";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { courseId } = await req.json();
    const authUser = await getSession();
    const email = authUser?.email ?? '';

    const result = await pool.query(
        `INSERT INTO "enrolledCourse" ("courseId", "userId", "xpEarned") VALUES ($1, $2, $3) RETURNING *`,
        [courseId ?? 0, email, 0]
    );

    return NextResponse.json(result.rows);
}
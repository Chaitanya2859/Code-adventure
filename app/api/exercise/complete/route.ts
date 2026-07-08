import pool from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const authUser = await getSession();
        if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const { courseId, chapterId, exerciseSlug, xp } = body;
        const email = authUser.email;

        // Check if already completed
        const existing = await pool.query(
            `SELECT * FROM "completedExercise"
             WHERE "courseId" = $1 AND "exerciseId" = $2 AND "userId" = $3`,
            [Number(courseId), exerciseSlug, email]
        );

        if (existing.rows.length > 0) {
            return NextResponse.json({ success: true, message: "Already completed" });
        }

        // Insert new completion
        await pool.query(
            `INSERT INTO "completedExercise" ("courseId", "chapterId", "exerciseId", "userId")
             VALUES ($1, $2, $3, $4)`,
            [Number(courseId), Number(chapterId), exerciseSlug, email]
        );

        // Add XP to enrolledCourse
        const enroll = await pool.query(
            `SELECT * FROM "enrolledCourse" WHERE "courseId" = $1 AND "userId" = $2`,
            [Number(courseId), email]
        );

        if (enroll.rows.length > 0) {
            const currentXp = enroll.rows[0].xpEarned || 0;
            await pool.query(
                `UPDATE "enrolledCourse" SET "xpEarned" = $1 WHERE id = $2`,
                [currentXp + Number(xp), enroll.rows[0].id]
            );
        } else {
            // Not enrolled yet — enroll them
            await pool.query(
                `INSERT INTO "enrolledCourse" ("courseId", "userId", "xpEarned") VALUES ($1, $2, $3)`,
                [Number(courseId), email, Number(xp)]
            );
        }

        return NextResponse.json({ success: true });
    } catch (e: any) {
        return NextResponse.json({ error: "Failed to save completion", details: e.message }, { status: 500 });
    }
}

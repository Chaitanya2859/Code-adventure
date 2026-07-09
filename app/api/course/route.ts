import pool from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
    const authUser = await getSession();
    const email = authUser?.email ?? '';

    const courseId = req.nextUrl.searchParams.get("courseid");

    if (courseId) {
        const [res, chapterResult, enrollCourse, completedEx] = await Promise.all([
            pool.query(
                `SELECT * FROM courses WHERE "courseId" = $1`,
                [Number(courseId)]
            ),
            pool.query(
                `SELECT * FROM chapters WHERE "courseId" = $1`,
                [Number(courseId)]
            ),
            pool.query(
                `SELECT * FROM "enrolledCourse" WHERE "courseId" = $1 AND "userId" = $2`,
                [Number(courseId), email]
            ),
            pool.query(
                `SELECT * FROM "completedExercise" WHERE "courseId" = $1 AND "userId" = $2`,
                [Number(courseId), email]
            ),
        ]);

        if (res.rows.length === 0) {
            return NextResponse.json({ error: "Course not found" }, { status: 404 });
        }

        const isEnrolled = enrollCourse.rows.length > 0;

        return NextResponse.json({
            ...res.rows[0],
            chapter: chapterResult.rows,
            userEnroll: isEnrolled,
            completedExercises: completedEx.rows.map((c: any) => c.exerciseId),
            earnedXp: isEnrolled ? enrollCourse.rows[0].xpEarned : 0,
        }, {
            headers: { 'Cache-Control': 's-maxage=0' }
        });
    } else {
        const res = await pool.query(`SELECT * FROM courses`);
        return NextResponse.json(res.rows);
    }
}
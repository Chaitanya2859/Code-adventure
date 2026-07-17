import pool from "@/config/db";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const authUser = await getSession();
        if (!authUser || !authUser.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const email = authUser.email;

        // Get Enrolled Courses to calculate Total XP
        const enrollmentsResult = await pool.query(
            `SELECT * FROM "enrolledCourse" WHERE "userId" = $1`,
            [email]
        );
        const enrollments = enrollmentsResult.rows;
        const totalXp = enrollments.reduce((sum: number, item: any) => sum + (item.xpEarned || 0), 0);

        //Get Completed Exercises 
        const completedResult = await pool.query(
            `SELECT * FROM "completedExercise" WHERE "userId" = $1`,
            [email]
        );
        const completed = completedResult.rows;

        const level = Math.floor(totalXp / 100) + 1;
        const levelProgress = totalXp % 100;

        return NextResponse.json({
            xp: totalXp,
            level,
            levelProgress,
        }, {
            headers: { 'Cache-Control': 's-maxage=0' }
        });
    } catch (e: any) {
        return NextResponse.json({ error: "Internal Server Error", details: e.message }, { status: 500 });
    }
}


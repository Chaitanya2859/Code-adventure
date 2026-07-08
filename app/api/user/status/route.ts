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

        // 1. Get Enrolled Courses to calculate Total XP
        const enrollmentsResult = await pool.query(
            `SELECT * FROM "enrolledCourse" WHERE "userId" = $1`,
            [email]
        );
        const enrollments = enrollmentsResult.rows;
        const totalXp = enrollments.reduce((sum: number, item: any) => sum + (item.xpEarned || 0), 0);

        // 2. Get Completed Exercises to calculate Badges and Daily Streak
        const completedResult = await pool.query(
            `SELECT * FROM "completedExercise" WHERE "userId" = $1`,
            [email]
        );
        const completed = completedResult.rows;

        // Badge count is number of completed exercises
        const badgesCount = completed.length;

        // 3. Calculate Daily Streak
        const dates = completed
            .map((c: any) => c.completedAt)
            .filter((d: any): d is Date => !!d)
            .map((d: Date) => {
                const year = d.getFullYear();
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const day = String(d.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            });

        const streak = getStreak(dates);

        const level = Math.floor(totalXp / 100) + 1;
        const levelProgress = totalXp % 100;

        return NextResponse.json({
            xp: totalXp,
            level,
            levelProgress,
            badges: badgesCount,
            streak,
        }, {
            headers: { 'Cache-Control': 's-maxage=0' }
        });
    } catch (e: any) {
        return NextResponse.json({ error: "Internal Server Error", details: e.message }, { status: 500 });
    }
}

function getStreak(dates: string[]): number {
    if (dates.length === 0) return 0;

    const getLocalDateStr = (d: Date) => {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const today = getLocalDateStr(new Date());

    const yesterdayObj = new Date();
    yesterdayObj.setDate(yesterdayObj.getDate() - 1);
    const yesterday = getLocalDateStr(yesterdayObj);

    const uniqueSorted = Array.from(new Set(dates)).sort((a, b) => b.localeCompare(a));

    const latestDate = uniqueSorted[0];
    if (latestDate !== today && latestDate !== yesterday) {
        return 0;
    }

    let streak = 1;
    let currentDateObj = new Date(latestDate + 'T00:00:00');

    for (let i = 1; i < uniqueSorted.length; i++) {
        const expectedDateObj = new Date(currentDateObj);
        expectedDateObj.setDate(expectedDateObj.getDate() - 1);
        const expectedDateStr = getLocalDateStr(expectedDateObj);

        if (uniqueSorted[i] === expectedDateStr) {
            streak++;
            currentDateObj = expectedDateObj;
        } else {
            break;
        }
    }

    return streak;
}

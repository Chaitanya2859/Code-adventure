import { db } from "@/config/db";
import { completedExerciseTable, enrolledCourseTable } from "@/config/userschema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";

export async function GET(req: NextRequest) {
    try {
        const user = await currentUser();
        if (!user || !user.primaryEmailAddress?.emailAddress) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const email = user.primaryEmailAddress.emailAddress;

        // 1. Get Enrolled Courses to calculate Total XP
        const enrollments = await db.select().from(enrolledCourseTable).where(
            eq(enrolledCourseTable.userId, email)
        );
        const totalXp = enrollments.reduce((sum, item) => sum + (item.xpEarned || 0), 0);

        // 2. Get Completed Exercises to calculate Badges and Daily Streak
        const completed = await db.select().from(completedExerciseTable).where(
            eq(completedExerciseTable.userId, email)
        );
        
        // Badge count is number of completed exercises (or we can derive milestones)
        const badgesCount = completed.length;

        // 3. Calculate Daily Streak
        // Extract dates (YYYY-MM-DD)
        const dates = completed
            .map(c => c.completedAt)
            .filter((d): d is Date => !!d)
            .map(d => {
                // Convert Date object to local YYYY-MM-DD
                const year = d.getFullYear();
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const day = String(d.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            });

        const streak = getStreak(dates);

        return NextResponse.json({
            xp: totalXp,
            badges: badgesCount,
            streak: streak
        }, {
            headers: { 'Cache-Control': 's-maxage=0' }
        });
    } catch (e: any) {
        return NextResponse.json({ error: "Internal Server Error", details: e.message }, { status: 500 });
    }
}

function getStreak(dates: string[]): number {
    if (dates.length === 0) return 0;

    // Get today and yesterday in local timezone YYYY-MM-DD
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

    // Filter unique dates and sort descending
    const uniqueSorted = Array.from(new Set(dates)).sort((a, b) => b.localeCompare(a));

    const latestDate = uniqueSorted[0];
    if (latestDate !== today && latestDate !== yesterday) {
        return 0;
    }

    let streak = 1;
    let currentDateObj = new Date(latestDate + 'T00:00:00'); // parse in local timezone

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

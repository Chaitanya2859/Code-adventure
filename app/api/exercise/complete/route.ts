import { db } from "@/config/db";
import { completedExerciseTable, enrolledCourseTable } from "@/config/userschema";
import { NextRequest, NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
    try {
        const user = await currentUser();
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const { courseId, chapterId, exerciseSlug, xp } = body;

        // Check if already completed
        const existing = await db.select().from(completedExerciseTable).where(
            and(
                eq(completedExerciseTable.courseId, Number(courseId)),
                eq(completedExerciseTable.exerciseId, exerciseSlug),
                eq(completedExerciseTable.userId, user.primaryEmailAddress?.emailAddress ?? '')
            )
        );

        if (existing.length > 0) {
            return NextResponse.json({ success: true, message: "Already completed" });
        }

        // Insert new completion
        await db.insert(completedExerciseTable).values({
            courseId: Number(courseId),
            chapterId: Number(chapterId),
            exerciseId: exerciseSlug,
            userId: user.primaryEmailAddress?.emailAddress ?? ''
        });

        // Add XP to enrolledCourseTable
        const enroll = await db.select().from(enrolledCourseTable).where(
            and(
                eq(enrolledCourseTable.courseId, Number(courseId)),
                eq(enrolledCourseTable.userId, user.primaryEmailAddress?.emailAddress ?? '')
            )
        );

        if (enroll.length > 0) {
            const currentXp = enroll[0].xpEarned || 0;
            await db.update(enrolledCourseTable).set({
                xpEarned: currentXp + Number(xp)
            }).where(eq(enrolledCourseTable.id, enroll[0].id));
        } else {
             // Not enrolled yet? Enroll them
             await db.insert(enrolledCourseTable).values({
                 courseId: Number(courseId),
                 userId: user.primaryEmailAddress?.emailAddress ?? '',
                 xpEarned: Number(xp)
             });
        }

        return NextResponse.json({ success: true });
    } catch (e: any) {
        return NextResponse.json({ error: "Failed to save completion", details: e.message }, { status: 500 });
    }
}

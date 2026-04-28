import { db } from "@/config/db";
import { chapterTable, courseTable, enrolledCourseTable, completedExerciseTable } from "@/config/userschema";
import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";


export async function GET(req:NextRequest) {

    const user= await currentUser()

    const courseId = req.nextUrl.searchParams.get("courseid");
    if(courseId){
        const [res, chapterResult, enrollCourse, completedEx] = await Promise.all([
            db.select().from(courseTable).where(eq(courseTable.courseId, Number(courseId))),
            db.select().from(chapterTable).where(eq(chapterTable.courseId, Number(courseId))),
            db.select().from(enrolledCourseTable).where(and(eq(enrolledCourseTable.courseId, Number(courseId)),(eq(enrolledCourseTable.userId, user?.primaryEmailAddress?.emailAddress ?? '')))),
            db.select().from(completedExerciseTable).where(and(eq(completedExerciseTable.courseId, Number(courseId)),(eq(completedExerciseTable.userId, user?.primaryEmailAddress?.emailAddress ?? ''))))
        ]);

        const isEnrolled = enrollCourse.length > 0;

        return NextResponse.json({
            ...res[0],
            chapter: chapterResult,
            userEnroll: isEnrolled,
            completedExercises: completedEx.map(c => c.exerciseId),
            earnedXp: isEnrolled ? enrollCourse[0].xpEarned : 0
        }, {
            headers: { 'Cache-Control': 's-maxage=0' }
        });
    } else {
        const res = await db.select().from(courseTable);
        return NextResponse.json(res, {
            headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=300' }
        });
    }
}
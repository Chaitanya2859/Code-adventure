import { db } from "@/config/db";
import { chapterTable, courseTable } from "@/config/userschema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";


export async function GET(req:NextRequest) {

    const courseId = req.nextUrl.searchParams.get("courseid");
    if(courseId){
        const res= await db.select().from(courseTable)
        //@ts-ignore
        .where(eq(courseTable.courseId,Number(courseId)))

        const chapterResult= await db.select().from(chapterTable)
        //@ts-ignore
        .where(eq(chapterTable.courseId,Number(courseId)))


        return NextResponse.json({
            ... res[0],
            chapter: chapterResult
        })
    }else{
    const res= await db.select().from(courseTable)
    return NextResponse.json(res)
    }
}
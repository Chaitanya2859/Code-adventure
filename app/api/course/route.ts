import { db } from "@/config/db";
import { courseTable } from "@/config/userschema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const res= await db.select().from(courseTable)
    return NextResponse.json(res)
}
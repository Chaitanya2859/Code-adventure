import { db } from "@/config/db";
import { commentsTable } from "@/config/userschema";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { postId, authorName, content } = await req.json();

    if (!postId || !content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const newComment = await db.insert(commentsTable).values({
      postId,
      userId,
      authorName: authorName || "Anonymous",
      content,
    }).returning();

    return NextResponse.json(newComment[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
  }
}

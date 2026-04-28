import { db } from "@/config/db";
import { votesTable } from "@/config/userschema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { postId, type } = await req.json(); // type is 'up' or 'down'

    if (!postId || !type) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Check if user already voted on this post
    const existingVote = await db.select().from(votesTable).where(
      and(
        eq(votesTable.postId, postId),
        eq(votesTable.userId, userId)
      )
    );

    if (existingVote.length > 0) {
      const vote = existingVote[0];
      if (vote.type === type) {
        // Toggle off if same vote
        await db.delete(votesTable).where(eq(votesTable.id, vote.id));
        return NextResponse.json({ message: "Vote removed" });
      } else {
        // Change vote
        await db.update(votesTable).set({ type }).where(eq(votesTable.id, vote.id));
        return NextResponse.json({ message: "Vote changed" });
      }
    } else {
      // New vote
      await db.insert(votesTable).values({
        postId,
        userId,
        type,
      });
      return NextResponse.json({ message: "Vote recorded" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to cast vote" }, { status: 500 });
  }
}

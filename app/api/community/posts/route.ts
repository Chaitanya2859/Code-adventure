import { db } from "@/config/db";
import { postsTable, votesTable, commentsTable } from "@/config/userschema";
import { auth } from "@clerk/nextjs/server";
import { desc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // We need to fetch posts with upvotes, downvotes, and comments.
    // For simplicity, we can fetch all and aggregate, or use Drizzle's sql builder.
    const allPosts = await db.select().from(postsTable).orderBy(desc(postsTable.createdAt));
    const allVotes = await db.select().from(votesTable);
    const allComments = await db.select().from(commentsTable);

    const postsWithDetails = allPosts.map(post => {
      const postVotes = allVotes.filter(v => v.postId === post.id);
      const postComments = allComments.filter(c => c.postId === post.id);
      return {
        ...post,
        upvotes: postVotes.filter(v => v.type === 'up').length,
        downvotes: postVotes.filter(v => v.type === 'down').length,
        comments: postComments
      };
    });

    return NextResponse.json(postsWithDetails);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { authorName, avatar, title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const newPost = await db.insert(postsTable).values({
      userId,
      authorName: authorName || "Anonymous",
      avatar: avatar || "/plant.png",
      title,
      content,
    }).returning();

    return NextResponse.json(newPost[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

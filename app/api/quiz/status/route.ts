import pool from "@/config/db";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const authUser = await getSession();
        const email = authUser?.email ?? '';

        if (!email) {
            return NextResponse.json({
                authenticated: false,
                userPlan: 'Explorer',
                attempts: {}
            });
        }

        const [userResult, attemptsResult] = await Promise.all([
            pool.query(`SELECT plan FROM users WHERE email = $1`, [email]),
            pool.query(
                `SELECT "quizId", MAX(score) as "bestScore", MAX("totalQuestions") as "totalQuestions", COUNT(*) as "totalAttempts", MAX("xpEarned") as "maxXpEarned"
                 FROM "quizAttempts"
                 WHERE "userId" = $1
                 GROUP BY "quizId"`,
                [email]
            )
        ]);

        const userPlan = userResult.rows[0]?.plan || 'Explorer';
        const attemptsMap: Record<string, any> = {};

        attemptsResult.rows.forEach(row => {
            attemptsMap[row.quizId] = {
                bestScore: Number(row.bestScore),
                totalQuestions: Number(row.totalQuestions),
                totalAttempts: Number(row.totalAttempts),
                maxXpEarned: Number(row.maxXpEarned)
            };
        });

        return NextResponse.json({
            authenticated: true,
            userPlan,
            attempts: attemptsMap
        });
    } catch (e: any) {
        return NextResponse.json({ error: "Failed to fetch quiz status", details: e.message }, { status: 500 });
    }
}

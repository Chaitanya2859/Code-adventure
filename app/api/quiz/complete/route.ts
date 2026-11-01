import pool from "@/config/db";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { QUIZ_PACKS } from "@/quizzes-data";

export async function POST(req: NextRequest) {
    try {
        const authUser = await getSession();
        if (!authUser || !authUser.email) {
            return NextResponse.json({ error: "Unauthorized. Please sign in to submit your quiz and earn XP." }, { status: 401 });
        }

        const email = authUser.email;
        const body = await req.json();
        const { quizId, score, totalQuestions } = body;

        const quiz = QUIZ_PACKS[quizId];
        if (!quiz) {
            return NextResponse.json({ error: "Invalid quiz pack" }, { status: 400 });
        }

        // Verify plan for JavaScript
        const userRes = await pool.query(`SELECT plan FROM users WHERE email = $1`, [email]);
        const userPlan = userRes.rows[0]?.plan || 'Explorer';

        if (quiz.isPaid && userPlan !== 'Adventurer' && userPlan !== 'Legend') {
            return NextResponse.json(
                { error: "The JavaScript Quiz is an exclusive perk of Adventurer and Legend plans. Please upgrade to record XP." },
                { status: 403 }
            );
        }

        const safeScore = Math.max(0, Math.min(Number(score) || 0, Number(totalQuestions) || 10));
        const safeTotal = Math.max(1, Number(totalQuestions) || 10);
        const earnedPercentage = safeScore / safeTotal;
        const xpEarned = Math.round(earnedPercentage * quiz.xpReward);

        // Record attempt in database
        await pool.query(
            `INSERT INTO "quizAttempts" ("userId", "quizId", score, "totalQuestions", "xpEarned")
             VALUES ($1, $2, $3, $4, $5)`,
            [email, quizId, safeScore, safeTotal, xpEarned]
        );

        // Award XP to enrolled course
        const courseId = quiz.courseId;
        const enrollResult = await pool.query(
            `SELECT * FROM "enrolledCourse" WHERE "courseId" = $1 AND "userId" = $2`,
            [courseId, email]
        );

        if (enrollResult.rows.length > 0) {
            const currentXp = enrollResult.rows[0].xpEarned || 0;
            await pool.query(
                `UPDATE "enrolledCourse" SET "xpEarned" = $1 WHERE id = $2`,
                [currentXp + xpEarned, enrollResult.rows[0].id]
            );
        } else {
            // Enroll the user with earned XP
            await pool.query(
                `INSERT INTO "enrolledCourse" ("courseId", "userId", "xpEarned") VALUES ($1, $2, $3)`,
                [courseId, email, xpEarned]
            );
        }

        return NextResponse.json({
            success: true,
            score: safeScore,
            totalQuestions: safeTotal,
            xpEarned,
            userPlan
        });
    } catch (e: any) {
        return NextResponse.json({ error: "Failed to submit quiz attempt", details: e.message }, { status: 500 });
    }
}

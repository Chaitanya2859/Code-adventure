import pool from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
    const authUser = await getSession();
    if (!authUser) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user already exists
    const existing = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [authUser.email]
    );

    // If user does not exist, create them
    if (existing.rows.length <= 0) {
        const res = await pool.query(
            `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`,
            [authUser.name, authUser.email]
        );
        return NextResponse.json(res.rows[0]);
    }

    return NextResponse.json(existing.rows[0]);
}
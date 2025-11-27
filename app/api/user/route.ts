import { db } from "@/config/db";
import { usersTable } from "@/config/userschema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest){
    const user = await currentUser()

    // if user already exist
    const users= await db.select().from(usersTable)
    // @ts-ignore
    .where(eq(usersTable.email,user?.primaryEmailAddress?.emailAddress))

    // if user does not exist create new user
    if(users?.length <=0){
        const newUser= {
            name: user?.fullName ?? '',
            email : user?.primaryEmailAddress?.emailAddress ?? ''
        }
        const res= await db.insert(usersTable).values(newUser).returning()
        return NextResponse.json(res[0])
    }

    return NextResponse.json(users[0])
    //Return user info
}
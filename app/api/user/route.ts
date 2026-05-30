import {db} from '@/config/dbConnect'
import {usersTable} from '@/config/schema'
import {currentUser} from '@clerk/nextjs/server'
import {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import { eq } from 'drizzle-orm'

export async function POST(req: NextRequest){
    const user = await currentUser();

    // if user already exists in database
    const users = await db.select().from(usersTable).where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress));

    // if user does not exist, create a new user
    if (users?.length == 0) {
        const newUser = await db.insert(usersTable).values({
            name: user?.firstName || 'No Name',
            email: user?.primaryEmailAddress?.emailAddress || 'No Email',
        }).returning();

        return NextResponse.json(newUser[0]);
    }

    return NextResponse.json(users[0]);

}
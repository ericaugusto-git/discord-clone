import { db } from '@/lib/db';
import { auth } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation';


export async function currentProfile(id?: string) {
    const { userId } = auth();
    if (!userId) {
        return null;
    }

    const dbUser =  await db.profile.findUnique({
        where: {
            userId: userId,
        },
    });

    if(!dbUser)
        return redirect('/setup')
    return dbUser;
}

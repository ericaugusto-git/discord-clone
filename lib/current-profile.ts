import { db } from '@/lib/db';
import { auth } from "@clerk/nextjs";
import { unstable_cache } from 'next/cache';

// This little guy made me waste 3 hrs trying to find out why my DB wasn't working. not cool >:(
// const cachedProfile = unstable_cache(async (userId) => {
    // const dbUser =  await db.profile.findUnique({
    //     where: {
    //         userId: userId,
    //     },
    // });
// });

export async function currentProfile() {
    const { userId } = auth();
    if (!userId) {
        return null;
    }

    // Use the cached function
    const dbUser =  await db.profile.findUnique({
        where: {
            userId: userId,
        },
    });
    
    return dbUser;
}

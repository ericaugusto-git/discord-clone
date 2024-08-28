import { db } from '@/lib/db';
import { auth } from "@clerk/nextjs";
import { unstable_cache } from 'next/cache';

// Wrap your function in `unstable_cache`
const cachedProfile = unstable_cache(async (userId) => {
    return await db.profile.findUnique({
        where: {
            userId: userId,
        },
    });
});

export async function currentProfile() {
    const { userId } = auth();
    if (!userId) {
        return null;
    }

    // Use the cached function
    const dbUser = await cachedProfile(userId);
    
    return dbUser;
}

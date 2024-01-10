import { db } from '@/lib/db';
import { getAuth } from '@clerk/nextjs/server';
import { NextApiRequest } from 'next';

export async function currentProfilePages (req: NextApiRequest){
    const { userId } = getAuth(req);
    if(!userId){
       return null;
    }

    const dbUser = await db.profile.findUnique({
        where: {
            userId: userId
        }
    })
    return dbUser;
}
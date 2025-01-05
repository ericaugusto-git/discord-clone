"use server"

import { authOptions } from "@/lib/auth-options"
import { db } from '@/lib/db';
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from 'next';
import { getServerSession } from 'next-auth';

export async function currentProfilePages(req: NextApiRequest, res: NextApiResponseServerIo) {
    const session  = await getServerSession(req, res, authOptions);
    console.log("session: ", session)

    if (!session?.user?.id) {
        return null;
    }

    const dbUser = await db.profile.findUnique({
        where: {
            id: session.user.id
        }
    });
    return dbUser;
}

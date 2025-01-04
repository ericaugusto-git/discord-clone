import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { db } from '@/lib/db';
import { NextApiRequest } from 'next';
import { getServerSession } from 'next-auth';

export async function currentProfilePages(req: NextApiRequest) {
    const session  = await getServerSession(authOptions);

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

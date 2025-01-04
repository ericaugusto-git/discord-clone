import { db } from '@/lib/db';
import { getServerSession } from "next-auth/next";
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function initialProfile() {
    const session = await getServerSession(authOptions);
    console.log("initial profile: ", session);
    if (!session?.user?.id) {
        return redirect('/sign-in');
    }

    const profile = await db.profile.findUnique({
        where: {
            id: session.user.id
        }
    });

    if (profile) {
        return profile;
    }

    const newProfile = await db.profile.create({
        data: {
            id: session.user.id,
            hashedPassword: session.user.hashedPassword,
            name: session.user.name ?? session.user.username,
            imageUrl: session.user.image ?? "",
            username: session.user.username
        }
    });

    return newProfile;
}

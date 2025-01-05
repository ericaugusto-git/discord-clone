import { db } from '@/lib/db';
import { getServerSession } from "next-auth/next";
import { redirect } from 'next/navigation';
import { authOptions } from "@/lib/auth-options"

export async function initialProfile() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return redirect('/sign-up');
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
            imageUrl: session.user.image ?? "",
            username: session.user.username
        }
    });

    return newProfile;
}

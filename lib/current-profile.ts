import { getServerSession } from "next-auth/next";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth-options"

export async function currentProfile() {
  const session: any = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return null;
  }

  const profile = await db.profile.findUnique({
    where: {
      id: session.user.id
    }
  });

  return profile;
}

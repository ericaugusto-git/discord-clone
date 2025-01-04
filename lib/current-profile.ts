import { getServerSession } from "next-auth/next";
import { db } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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

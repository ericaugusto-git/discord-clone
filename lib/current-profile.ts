import { db } from '@/lib/db';
import { auth} from "@clerk/nextjs";

export async function currentProfile (){
    const { userId } = auth();
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
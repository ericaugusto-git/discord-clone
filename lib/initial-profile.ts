import { db } from '@/lib/db';
import { currentUser, redirectToSignIn } from "@clerk/nextjs";

export async function initialProfile (){
    const user = await currentUser();
    if(!user){
       return redirectToSignIn(); 
    }

    const dbUser = await db.profile.findUnique({
        where: {
            userId: user.id
        }
    })

    if(dbUser){
        return dbUser;
    }

    const newUser = await db.profile.create({
        data: {
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress,

        }
    })
    return newUser;
}

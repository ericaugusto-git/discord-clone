import { db } from '@/lib/db';
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation';

export async function initialProfile (){
    const user = await currentUser();
    if(!user){
       return redirect('sign-in'); 
    }
    console.log("what??")
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
            name: `${user.firstName ?? user.username ?? 'Nameless'} ${user.lastName ?? ''}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress,

        }
    })
    return newUser;
}

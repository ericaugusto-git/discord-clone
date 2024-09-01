import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirectToSignIn } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface InviteCodePageProps { 
    params: {
        inviteCode:string;
    };
};

const InviteCodePage = async (
    {params}: InviteCodePageProps
) => {
    const profile = await initialProfile();
    if(!profile){
        redirect("http://localhost:3000/sign-in"); // Use full URL or relative path
        return;
    }

    if(!params?.inviteCode){
        redirect("/")
    }

    const exitingServer = await db.server.findFirst(
        {
            where:{
                inviteCode: params?.inviteCode,
                members: {
                    some: {
                        profileId: profile.id
                    }
                }
            }
        }
        )
    if(exitingServer){
        return redirect(`/servers/${exitingServer.id}`);    
    }

    const server = await db.server.update({
        where: {
            inviteCode: params?.inviteCode
        },
        data: {
            members: {
                create: [
                    {
                        profileId: profile.id
                    }
                ]
            }
        }
    })
    if(server)
        redirect(`/servers/${server.id}`);
    //TODO: Page for expired link/Page to confirm enter the server
    return null;
}
 
export default InviteCodePage;
import ServerSidebar from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ServerIdLaayout = async (
    {children, params}: {children: React.ReactNode, params: {serverId: string}}
) => {
    const profile = await currentProfile();
    if(!profile)
        return redirectToSignIn();
    const server = await db.server.findUnique({
        where: {
            id: params?.serverId,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })
    //TODO: tell the user the server was deleted/he is not a member
    if(!profile){
        redirect("/");
    }
    return ( 
        <div className="h-full">
            <div className="hidden fixed md:flex h-full w-60 z-20 flex-col inset-y-0">
                <ServerSidebar serverId={params?.serverId}/>
            </div>
            <main className="h-full md:pl-60">
            {children}
            </main>
        </div>
     );
}
 
export default ServerIdLaayout;
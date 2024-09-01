import ChatHeader from "@/components/chat/chat-header";
import ServerSidebar from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ServerIdLaayout = async (
    {children, params}: {children: React.ReactNode, params: {serverId: string}}
) => {
    const profile = await currentProfile();
    if(!profile)
        return redirectToSignIn();
    // const server = await db.server.findUnique({
    //     where: {
    //         id: params?.serverId,
    //         members: {
    //             some: {
    //                 profileId: profile.id
    //             }
    //         }
    //     }
    // })

    //TODO: tell the user the server was deleted/he is not a member
    if(!profile){
        redirect("/");
    }
    
    
    return ( 
        <div className="h-full flex gap-bento-gap flex-col">
            <div className="">
                <ChatHeader/>
            </div>
            <div className="h-full flex min-h-0">
                <div className="hidden md:flex h-full w-60 z-20 flex-col">
                    <ServerSidebar serverId={params?.serverId}/>
                </div>
                <section className="h-full w-full bg-chat-grey rounded-r-bento-item-radius">
                    {children}
                </section>
            </div>
        </div>
     );
}
 
export default ServerIdLaayout;
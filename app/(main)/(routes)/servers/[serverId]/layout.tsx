import ChatHeader from "@/components/chat/chat-header";
import MobileToggle from "@/components/mobile-toggle";
import ServerSidebar from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { RedirectToSignUp } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ServerIdLaayout = async (
    {children, params}: {children: React.ReactNode, params: {serverId: string}}
) => {
    const profile = await currentProfile();
    if(!profile){
        return <RedirectToSignUp/>;
    }
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
            <div className="flex w-full gap-2 items-center">
                <MobileToggle serverId={params.serverId}>
                    <ServerSidebar serverId={params?.serverId}/>
                </MobileToggle>
                <ChatHeader/>
            </div>
            <div className="h-full flex min-h-0">
                <div className="hidden md:flex h-full w-60 z-20 flex-col">
                    <ServerSidebar serverId={params?.serverId}/>
                </div>
                <section className="h-full w-full bg-chat-grey rounded-bento-item-radius md:!rounded-l-none">
                    {children}
                </section>
            </div>
        </div>
     );
}
 
export default ServerIdLaayout;
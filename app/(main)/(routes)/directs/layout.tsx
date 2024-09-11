import ChatHeader from "@/components/chat/chat-header";
import DirectsSidebar from "@/components/directs/directs-sidebar";
import { useSocket } from "@/components/providers/socket-provider";
import WelcomePage from "@/components/welcome-page";
import { currentProfile } from "@/lib/current-profile";
import { getDirects } from "@/lib/direct";

const Direct = async ({children}: {children: React.ReactNode}) => {
    const profile = await currentProfile();
    if(!profile)
        return null;
    
    const directs = await getDirects(profile.id);
    
    if(directs)
    // 
    
    return <div className="flex flex-col gap-bento-gap h-full">
        <ChatHeader/>
        <div className="flex h-full min-h-0">
            <div className="hidden md:flex h-full w-60 z-20 flex-col">
                <DirectsSidebar profile={profile} directs={directs}/>
            </div>
            
            <section className="bg-chat-grey rounded-r-bento-item-radius w-full h-full">
                <WelcomePage profile={profile}/>
                {children}
            </section>
        </div>
    </div>
}

export default Direct;
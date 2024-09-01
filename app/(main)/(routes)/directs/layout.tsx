import DirectsSidebar from "@/components/directs/directs-sidebar";
import WelcomePage from "@/components/welcome-page";
import { currentProfile } from "@/lib/current-profile";
import { getDirects } from "@/lib/direct";

const Direct = async ({children}: {children: React.ReactNode}) => {
    const profile = await currentProfile();
    if(!profile)
        return null;
    
    const directs = await getDirects(profile.id);
    console.log("directs:")
    if(directs)
    // console.log(directs[0])
    
    return <div className="flex h-full">
        <DirectsSidebar profile={profile} directs={directs}/>
        <WelcomePage/>
        {children}
    </div>
}

export default Direct;
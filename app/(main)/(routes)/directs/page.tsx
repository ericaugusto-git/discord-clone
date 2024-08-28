import DirectsSidebar from "@/components/directs/directs-sidebar";
import WelcomePage from "@/components/welcome-page";
import { currentProfile } from "@/lib/current-profile";

const Direct = async () => {
    const profile = await currentProfile();
    console.log('profile: ')
    console.log(profile)
    if(!profile)
        return null;
    return <div className="flex h-full">
        <DirectsSidebar profile={profile}/>
        <WelcomePage/>
    </div>
}

export default Direct;
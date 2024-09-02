"use client"

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function WelcomePage (){
    const path = usePathname();
    if(path?.includes('direct/'))
        return;
    return <div className="w-full h-full flex justify-center items-center flex-col gap-3">
            <Image src="/welcome.png" className="saturate-0" width="168" height="114" alt="welcome"/>
        <div className="text-center text-[#b4b4b4] text-sm">
            <p className="text-white">Hello there! 👋</p>
            <p>This is project is for education pruporses only so its not meant to be used seriously.</p>
            <p>Please do not upload any sensity inforation because ITS NOT PRIVATE.</p>
        </div>
        
        {/* <BackgroundImage src="/welcome.png" size="314px"/> */}
    </div>
}
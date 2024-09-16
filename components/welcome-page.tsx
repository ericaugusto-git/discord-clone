"use client"

import { Tooltip } from "@radix-ui/react-tooltip";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ActionTooltip from "./action-tooltip";
import { useModal } from "@/hooks/use-modal-store";
import { useCurrentProfile } from "./providers/profile-provider";
import { UserProfile } from "@clerk/nextjs";
import { MessagesSquareIcon } from "lucide-react";
import { DirectWithProfile } from "@/lib/direct";
import MobileToggle from "./mobile-toggle";

export default function WelcomePage ({directs}: {directs: DirectWithProfile[]}){
    const {profile} = useCurrentProfile();
    const {onOpen} = useModal();
    const path = usePathname();
    if(path?.includes('direct/'))
        return;
    return (
        <div className="flex flex-col gap-bento-gap h-full">

            <MobileToggle directs={directs} profile={profile!}>
            <button className="flex md:hidden gap-2 items-center h-10 justify-center bg-opposite-bg text-main-bg rounded-bento-item-radius w-full min-h-0">
                <MessagesSquareIcon/> open your dms 
            </button>
            </MobileToggle>

            <div className="w-full bg-chat-grey rounded-bento-item-radius md:rounded-l-none  h-full flex justify-center items-center flex-col gap-3">
                <Image src="/welcome.png" className="saturate-0 hidden md:block" width="168" height="114" alt="welcome" />
                <div className="text-center text-unfocus-grey text-sm px-4">
                    <p className="dark:text-white text-black">Well, hello there! 👋</p>
                    <p>This project is for educational purposes only and is not intended for real-world use.</p>
                    <p>Please avoid uploading any sensitive information, as <span className="text-red-400">ITS NOT PRIVATE.</span></p>
                    <div className="flex gap-3 items-center justify-center my-2">
                        {/* <ActionTooltip side="bottom" align="center" label="projet repo">
                            <a href="https://github.com/ericaugusto-git" target="_blank" className='group size-10 bg-direct-sidebar-accent shadow-slate-50/10 shadow-inner flex items-center justify-center rounded-full'><span style={{maskImage: `url("/icons/github.svg")`}} className="block mx-auto size-[18px] bg-black  dark:bg-white svgMask group-hover:opacity-80 cursor-pointer"></span> </a>
                        </ActionTooltip>
                        <ActionTooltip side="bottom" align="center" label="projet repo">
                            <a href="https://github.com/ericaugusto-git" target="_blank" className='group size-10 bg-direct-sidebar-accent shadow-slate-50/10 shadow-inner flex items-center justify-center rounded-full'><span style={{maskImage: `url("/icons/globe.svg")`}} className="block mx-auto size-[18px] bg-black  dark:bg-white svgMask group-hover:opacity-80 cursor-pointer"></span> </a>
                        </ActionTooltip>
                        <ActionTooltip side="bottom" align="center" label="projet repo">
                            <a href="https://github.com/ericaugusto-git" target="_blank" className='group size-10 bg-direct-sidebar-accent shadow-slate-50/10 shadow-inner flex items-center justify-center rounded-full'><span style={{maskImage: `url("/icons/linkedin.svg")`}} className="block mx-auto size-[18px] bg-black  dark:bg-white svgMask group-hover:opacity-80 cursor-pointer"></span> </a>
                        </ActionTooltip> */}
                            <ActionTooltip side="bottom" align="center" label="projet repo">
                                <a href="https://github.com/ericaugusto-git" target="_blank" className='group'><span style={{maskImage: `url("/icons/github.svg")`}} className="block mx-auto size-[18px] bg-black  dark:bg-white svgMask group-hover:opacity-80 cursor-pointer"></span> </a>
                            </ActionTooltip>
                            <ActionTooltip side="bottom" align="center" label="my website">
                                <a href="https://ericaugusto.pages.dev"  target="_blank" className='group'><span style={{maskImage: `url("/icons/globe.svg")`}} className="block mx-auto size-[18px] bg-black  dark:bg-white svgMask group-hover:opacity-80 cursor-pointer"></span> </a>
                            </ActionTooltip>
                            <ActionTooltip side="bottom" align="center" label="my linkedin">
                                <a href="https://www.linkedin.com/in/eric-augusto-775245a9/"  target="_blank" className='group'><span style={{maskImage: `url("/icons/linkedin.svg")`}} className="block mx-auto size-[18px] bg-black  dark:bg-white svgMask group-hover:opacity-80 cursor-pointer"></span> </a>
                            </ActionTooltip>
                    </div>
                    <p>
                        <strong>Legal Disclaimer:</strong> The platform is not responsible for user-generated content. Users are solely responsible for their actions, and any illegal activity will be reported and removed.
                    </p>
                </div>
                <div className="flex gap-3 flex-col md:flex-row text-sm sm:text-base">
                    <button className="border rounded-full px-4 xsm:px-4 dark:bg-white bg-black text-white  dark:text-black p-2 hover:opacity-90" onClick={() => onOpen("invite", {inviteLink: `/directs/direct/${profile?.id}`})}>Invite someone to chat</button>
                    <button  className="border rounded-full px-4 xsm:px-4 dark:hover:bg-slate-50/10 hover:bg-black/10  border-[#AEBBC1] p-2" onClick={() => onOpen("createServer")}>Create a server</button>
                </div>
            </div>
        </div>
    );
}

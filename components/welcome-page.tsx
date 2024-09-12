"use client"

import { Tooltip } from "@radix-ui/react-tooltip";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ActionTooltip from "./action-tooltip";
import { useModal } from "@/hooks/use-modal-store";
import { useCurrentProfile } from "./providers/profile-provider";

export default function WelcomePage (){
    const {profile} = useCurrentProfile();
    const {onOpen} = useModal();
    const path = usePathname();
    if(path?.includes('direct/'))
        return;
    return (
        <div className="w-full h-full flex justify-center items-center flex-col gap-3">
            <Image src="/welcome.png" className="saturate-0" width="168" height="114" alt="welcome" />
            <div className="text-center text-unfocus-grey text-sm px-4">
                <p className="text-white">Well, hello there! 👋</p>
                <p>This project is for educational purposes only and is not intended for real-world use.</p>
                <p>Please avoid uploading any sensitive information, as <span className="text-red-400">ITS NOT PRIVATE.</span></p>
                {/* <p>Chats plus uploaded stuff might be lost if i feel like resetting the DB</p> */}
                {/* <p>You got the chase, this is a portfo</p> */}
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
            <div className="flex gap-3">
                <button className="border rounded-full px-6 bg-white  text-black p-2 hover:opacity-90" onClick={() => onOpen("invite", {inviteLink: `/directs/direct/${profile?.id}`})}>Invite someone to chat</button>
                <button  className="border rounded-full px-6 hover:bg-slate-50/10 border-[#AEBBC1] p-2" onClick={() => onOpen("createServer")}>Create a server</button>
            </div>
        </div>
    );
}

"use client"

import Image from "next/image";
import ActionTooltip from "../action-tooltip";
import { cn } from "@/lib/utils";
import { useParams , usePathname, useRouter} from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import UserAvatar from "../user-avatar";
import BackgroundImage from "../ui/background-image";
import { useCurrentChat } from "@/hooks/use-current-chat-store";

type NavigationItemProps = {
    id?: string,
    imageUrl: string,
    name: string
}

const NavigationItem = (
    {id, imageUrl, name}: NavigationItemProps
) => {
    const params = useParams()
    const router = useRouter();
    const pathName = usePathname();
    const {setCurrentChat} = useCurrentChat();
    const active = id ? params?.serverId === id : pathName == '/directs';
    const changeChannel = () => {
        if(id)
            router.push(`/servers/${id}`)
        else{
            router.push(`/directs`)
        }
        setCurrentChat(null, null);
    }

    return ( 
        <ActionTooltip
        side="right"
        align="center"
        label={name}
        >
        <button
        onClick={() => {changeChannel()}}
        className="group relative flex items-center"
        >
            {/* <div className={cn(
                "abolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
                params?.serverId !== id && "group-hover:h-[20px]",
                params?.serverId === id ? "h-[36px]" : "h-[8px]"
            )}/> */}
            
            <div className={cn("relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[17px] transition-[border-radius] overflow-hidden",
                active && "bg-primary/10 text-primary border-2 border-black dark:border-white rounded-[17px]")}>
                    <BackgroundImage src={imageUrl} size={'48px'}/>

            </div>

        </button>
        </ActionTooltip>
     );
}
 
export default NavigationItem;
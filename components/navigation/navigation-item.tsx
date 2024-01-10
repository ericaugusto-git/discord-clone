"use client"

import Image from "next/image";
import ActionTooltip from "../action-tooltip";
import { cn } from "@/lib/utils";
import { useParams , useRouter} from "next/navigation";

type NavigationItemProps = {
    id: string,
    imageUrl: string,
    name: string
}

const NavigationItem = (
    {id, imageUrl, name}: NavigationItemProps
) => {
    const params = useParams()
    const router = useRouter();

    const changeChannel = () => {
        router.push(`/servers/${id}`)
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
            <div className={cn(
                "abolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
                params?.serverId !== id && "group-hover:h-[20px]",
                params?.serverId === id ? "h-[36px]" : "h-[8px]"
            )}/>
            
            <div className={cn("relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
                params?.serverId === id && "bg-primary/10 text-primary rounded-[16px]")}>
                <Image 
                fill
            
                alt="Channel"
                src={imageUrl}
                />

            </div>

        </button>
        </ActionTooltip>
     );
}
 
export default NavigationItem;
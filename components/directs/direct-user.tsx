"use client"

import { cn } from "@/lib/utils";
import { Profile } from "@prisma/client";
import { useRouter } from "next/navigation";
import UserAvatar from "../user-avatar";
import useRedirectToDirect from "@/hooks/use-redirect-to-direct";

export default function DirectUser({profile, active}: {profile: Profile, active: boolean}){
   const {redirectToDirect} = useRedirectToDirect();
   
    return ( 
        <button
        onClick={() => redirectToDirect(profile.id)}
        className={cn("group p-1 px-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1", 
        active && "bg-zinc-700/10 dark:bg-zinc-700/50"
        )}
        >
            <UserAvatar
            name={profile.username}
                src={profile.imageUrl!}
                className="h-8 w-8 md:h-8 md:w-8 text-xs"
            />
            <p
            className={cn("text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition")}
            >
                {profile.username}
            </p>
        </button>
     );
}
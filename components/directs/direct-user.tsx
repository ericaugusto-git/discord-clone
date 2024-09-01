"use client"

import { cn } from "@/lib/utils";
import { Profile } from "@prisma/client";
import UserAvatar from "../user-avatar";
import { useRouter } from "next/navigation";

export default function DirectUser({profile}: {profile: Profile}){
    const router = useRouter();

    const onClick = () => {
        router.push(`/directs/direct/${profile.id}`);
    }
    return ( 
        <button
        onClick={onClick}
        className={"group p-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1"}
        >
            <UserAvatar
                src={profile.imageUrl}
                className="h-8 w-8 md:h-8 md:w-8"
            />
            <p
            className={cn("font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition")}
            >
                {profile.name}
            </p>
        </button>
     );
}
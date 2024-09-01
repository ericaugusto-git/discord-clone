import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Profile } from "@prisma/client";

export default function CurrentUser({profile, className}: {profile: Profile, className?: string}){
    return         <div className={cn(className,"mt-auto rounded-bl-bento-item-radius bg-direct-sidebar-accent  h-14 flex items-center p-[10px] gap-2 text-sm font-thin")}>
    <UserButton afterSignOutUrl="/" appearance={{
            elements: {avatarBox: 
                "size-[41px]"
            }
        }}/>
    {profile.name}
</div>
}
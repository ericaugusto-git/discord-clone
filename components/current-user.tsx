import { cn } from "@/lib/utils";
import { Profile } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function CurrentUser({profile, className}: {profile: Profile, className?: string}){
    return         <div className={cn(className,"mt-auto md:rounded-bl-bento-item-radius bg-direct-sidebar-accent  h-14 flex items-center p-[10px] gap-2 text-sm dark:font-thin")}>
    {/* <UserButton afterSignOutUrl="/" appearance={{
            elements: {avatarBox: 
                "size-[41px]"
            }
        }}/> */}
    <Avatar className="size-[41px]">
        <AvatarImage src={profile.imageUrl ?? ""}/>
        <AvatarFallback>{profile.name?.charAt(0)}</AvatarFallback>
    </Avatar>
</div>
}
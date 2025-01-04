import { cn } from "@/lib/utils";
import { Profile } from "@prisma/client";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

export default function CurrentUser({profile, className}: {profile: Profile, className?: string}){
    console.log("profile: ", profile

    )
    const name = profile.username ?? profile.name;
    const initials = name?.slice(0, 2).toUpperCase() || 'U';
    
    return         <div className={cn(className,"mt-auto md:rounded-bl-bento-item-radius bg-direct-sidebar-accent  h-14 flex items-center p-[10px] gap-2 text-sm dark:font-thin")}>
    {/* <UserButton afterSignOutUrl="/" appearance={{
            elements: {avatarBox: 
                "size-[41px]"
            }
        }}/> */}
            <Avatar>
      <AvatarImage src={profile.imageUrl!} alt={`${name} profile picture`} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
		{/* <Avatar className="inline-flex size-[45px] select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle">
			<AvatarFallback className="leading-1 flex size-full items-center justify-center bg-white text-[15px] font-medium text-purple">
				{initials}
			</AvatarFallback>
		</Avatar> */}
    {name}
</div>
}
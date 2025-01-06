'use client'

import { cn } from "@/lib/utils";
import { Profile } from "@prisma/client";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function CurrentUser({profile, className}: {profile: Profile, className?: string}){
    const name = profile.username;
    const initials = name?.slice(0, 2).toUpperCase() || 'U';
    const handleSignout = () => {

    }
    return         <div className={cn(className,"mt-auto md:rounded-bl-bento-item-radius bg-direct-sidebar-accent  h-14 flex items-center p-[10px] gap-2 text-sm dark:font-thin")}>
    {/* <UserButton afterSignOutUrl="/" appearance={{
            elements: {avatarBox: 
                "size-[41px]"
            }
        }}/> */}
        <DropdownMenu>
  <DropdownMenuTrigger>            <Avatar>
      <AvatarImage src={profile.imageUrl!} alt={`${name} profile picture`} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onClick={() => signOut()} className="flex justify-between items-center">
         logout  <LogOut className="size-3 dark:text-gray-400"/>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>


		{/* <Avatar className="inline-flex size-[45px] select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle">
			<AvatarFallback className="leading-1 flex size-full items-center justify-center bg-white text-[15px] font-medium text-purple">
				{initials}
			</AvatarFallback>
		</Avatar> */}
    {name}
</div>
}
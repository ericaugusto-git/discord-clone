import { DirectWithProfile } from "@/lib/direct";
import { Profile } from "@prisma/client";
import { Menu, MessagesSquareIcon } from "lucide-react";
import { ReactNode } from "react";
import DirectsSidebar from "./directs/directs-sidebar";
import ServerSidebar from "./server/server-sidebar";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const MobileToggle = ({children,serverId, directs, profile, isDirects}: {children?: ReactNode ,serverId?: string, directs?: DirectWithProfile[], profile?: Profile, isDirects?: boolean}) => {
    
    return ( 
        <Sheet>
            <SheetTrigger asChild>
                {isDirects ?             <button className="flex md:hidden gap-2 items-center h-10 justify-center bg-opposite-bg text-main-bg rounded-bento-item-radius w-full min-h-0">
                <MessagesSquareIcon/> open your dms 
            </button> :<Button variant="ghost" size="icon" className="dark:bg-[#f7f7f8] bg-[#1d1d1d] md:hidden w-14 !rounded-bento-item-radius">
                    <Menu className="text-main-bg"/>
                </Button>}

            </SheetTrigger>
            <SheetContent side="left" className="p-0 flex gap-0">
                    {children}
            </SheetContent>
        </Sheet>
     );
}
 
export default MobileToggle;
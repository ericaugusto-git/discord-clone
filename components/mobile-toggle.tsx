import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import Sidebar from "./navigation/sidebar";
import ServerSidebar from "./server/server-sidebar";
import DirectsSidebar from "./directs/directs-sidebar";
import { DirectWithProfile } from "@/lib/direct";
import { Profile } from "@prisma/client";
import { ReactNode } from "react";

const MobileToggle = ({children,serverId, directs, profile}: {children?: ReactNode ,serverId?: string, directs?: DirectWithProfile[], profile?: Profile}) => {
    
    return ( 
        <Sheet>
            <SheetTrigger asChild>
                {children ? children :<Button variant="ghost" size="icon" className="dark:bg-[#f7f7f8] bg-[#1d1d1d] md:hidden w-14 !rounded-bento-item-radius">
                    <Menu className="text-main-bg"/>
                </Button>}

            </SheetTrigger>
            <SheetContent side="left" className="p-0 flex gap-0">
                {directs ? <DirectsSidebar profile={profile!} directs={directs}></DirectsSidebar> : <ServerSidebar
                    serverId={serverId!}
                />}
            </SheetContent>
        </Sheet>
     );
}
 
export default MobileToggle;
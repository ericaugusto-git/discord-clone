import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

import { ModeToggle } from "../mode-toggle";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { NavigationAction } from './navigation-action';
import NavigationItem from "./navigation-item";

const Sidebar = async () => {
    const profile = await currentProfile();

    if(!profile){
        return redirect("/");
    }

    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })
    
    return ( 
    <div className="flex flex-col items-center  h-full 
    text-pretty w-full rounded-bento-item-radius
    dark:bg-bento-item bg-[#E3E5E8] py-3">
        <NavigationItem
        home={true}
        name={'direct'}
        imageUrl="/logo.svg"
        >

        </NavigationItem>
        <Separator 
        className="mt-10 h-[2px] bg-zinc-300  dark:bg-zinc-700
        rounded-md w-10 mx-auto my-6"
        />
        <ScrollArea className="flex-1 w-full">
            {servers.map((server) => (
                <div key={server.id} className="mb-4">
                    <NavigationItem
                        name={server.name}
                        id={server.id}
                        imageUrl={server.imageUrl}>

                    </NavigationItem>
                </div>
            ))}
            <NavigationAction/>
        </ScrollArea>
        <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
            <ModeToggle/>
        </div>
    </div> 
    );
}
 
export default Sidebar;
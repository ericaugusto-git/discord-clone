import { Profile } from "@prisma/client";

const DirectsSidebar = ({profile}: {profile: Profile}) => {
    return  <div className="flex flex-col h-full text-primary p-[15px] 
    dark:bg-server-sidebar rounded-l-bento-item-radius bg-[#F2F3F5]">
        <input style={{backgroundImage: 'url("/icons/lupa.svg")', backgroundSize: '20px'}} className="bg-[#212121] bg-no-repeat bg-[8px] rounded-full p-1 pl-9 focus-visible:outline-none" placeholder="Search..."/>
        <div className="mt-auto bg-direct-sidebar-accent -m-[15px] rounded-lb rounded-bl-bento-item-radius h-14 flex items-center p-[10px] gap-2">
            <div className="backgroundImage size-[41px] rounded-full "  style={{backgroundImage: `url("${profile.imageUrl}")`}}></div>
            {profile.name}
        </div>
    </div>
}
// outline-white outline outline-2
export default DirectsSidebar;
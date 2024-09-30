"use client"

import { DirectWithProfile } from "@/lib/direct";
import { Profile } from "@prisma/client";
import CurrentUser from "../current-user";
import DirectUser from "./direct-user";
import { useParams } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useSocket } from "../providers/socket-provider";
import axios from "axios";
import useDirects from "../providers/directs-provider";

const DirectsSidebar = ({
  profile,
  // directs
}: {
  profile: Profile;
  // directs: D irectWithProfile[] | null;
}) => {
  const params = useParams();
  const {onOpen} = useModal();
  const {directs} = useDirects();
  useEffect(() => {
    setFilteredDirects(directs);
  }, [directs])
  const [filteredDirects, setFilteredDirects] = useState(directs)
  const filterDirect = (value: string) => {
    if(!value){
      setFilteredDirects(directs);
      return;
    }
    setFilteredDirects((lastFiltered) => {
      const filtered = lastFiltered?.filter((direct) => {
           const otherMember = direct.profileOne.id === profile.id ? direct.profileTwo : direct.profileOne;
           return otherMember.name.toLocaleLowerCase().includes(value.toLowerCase())
         })

      return filtered as DirectWithProfile[];
    })
  }
  return (
    <div
      className="flex gap-[30px] flex-col h-full text-primary p-[15px] 
    dark:bg-server-sidebar md:rounded-l-bento-item-radius bg-[#F2F3F5]  pt-12 md:pt-[15px] w-full"
    >
      <input
        style={{
          backgroundImage: 'url("/icons/lupa.svg")',
          backgroundSize: "20px",
        }}
        onChange={(e) => filterDirect(e.target.value)}
        className="bg-direct-sidebar-accent bg-no-repeat bg-[8px] rounded-full p-1 pl-9 focus-visible:outline-none"
        placeholder="Search..."
      />
      <div className="flex flex-col gap-2 ">
      <div className="flex items-center justify-between">
        <p className="text-zinc-500 text-xs uppercase">Directs messages</p>
        <button onClick={() => onOpen("invite", {inviteLink: `/directs/direct/${profile.id}`})} className="text-zinc-500 hover:text-zinc-600
                          dark:text-zinc-400 dark:hover:text-zinc-300 transition">
                              <Plus className="size-4"/>
        </button>
      </div>
        {filteredDirects?.map((direct) => {
          const otherGuy = direct.profileOne.id === profile.id ? direct.profileTwo : direct.profileOne; 
          return <DirectUser key={direct.id} profile={otherGuy} active={params?.profileId == otherGuy.id}/>;
        })}
      </div>
      {(!filteredDirects || filteredDirects?.length == 0) && Array.from(Array(4).keys()).reverse().map((a) => {
  const opacityClass = ["opacity-10", "opacity-20", "opacity-30", "opacity-40"][a];
  return (
    <div key={a} className={cn("flex items-center gap-3", opacityClass)}>
      <div className="size-8 w-10 bg-direct-sidebar-accent rounded-full"></div>
      <div className="size-8 w-full rounded-full bg-direct-sidebar-accent"></div>
    </div>
  );
})}

      <CurrentUser className="-m-[15px]" profile={profile} />
    </div>
  );
};
// outline-white outline outline-2
export default DirectsSidebar;
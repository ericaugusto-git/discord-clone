"use client"
import { DirectWithProfile } from "@/lib/direct";
import { Profile } from "@prisma/client";
import CurrentUser from "../current-user";
import DirectUser from "./direct-user";
import { useParams } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Plus } from "lucide-react";
import { useState } from "react";

const DirectsSidebar = ({
  profile,
  directs,
}: {
  profile: Profile;
  directs: DirectWithProfile[] | null;
}) => {
  const params = useParams();
  const {onOpen} = useModal();
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
  console.log(filteredDirects)
  return (
    <div
      className="flex gap-[30px] flex-col h-full text-primary p-[15px] 
    dark:bg-server-sidebar rounded-l-bento-item-radius bg-[#F2F3F5]"
    >
      <input
        style={{
          backgroundImage: 'url("/icons/lupa.svg")',
          backgroundSize: "20px",
        }}
        onChange={(e) => filterDirect(e.target.value)}
        className="bg-[#212121] bg-no-repeat bg-[8px] rounded-full p-1 pl-9 focus-visible:outline-none"
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
      <CurrentUser className="-m-[15px]" profile={profile} />
    </div>
  );
};
// outline-white outline outline-2
export default DirectsSidebar;
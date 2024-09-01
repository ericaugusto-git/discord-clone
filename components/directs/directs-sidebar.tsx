import { Direct, Profile } from "@prisma/client";
import BackgroundImage from "../ui/background-image";
import { UserButton } from "@clerk/nextjs";
import CurrentUser from "../current-user";
import DirectUser from "./direct-user";
import { DirectWithProfile } from "@/lib/direct";

const DirectsSidebar = ({
  profile,
  directs,
}: {
  profile: Profile;
  directs: DirectWithProfile[] | null;
}) => {
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
        className="bg-[#212121] bg-no-repeat bg-[8px] rounded-full p-1 pl-9 focus-visible:outline-none"
        placeholder="Search..."
      />
      {directs?.map((direct) => {
        const otherGuy = direct.profileOne.id === profile.id ? direct.profileTwo : direct.profileOne; 
        return <DirectUser key={direct.id} profile={otherGuy} />;
      })}
      <CurrentUser className="-m-[15px] " profile={profile} />
    </div>
  );
};
// outline-white outline outline-2
export default DirectsSidebar;

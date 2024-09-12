import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { PhoneCall, PhoneMissed } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import queryString from "query-string";
import { useSocket } from "../providers/socket-provider";
import { DialogHeader } from "../ui/dialog";
import UserAvatar from "../user-avatar";
import Image from "next/image";

export default function DeniedCall() {
  const pathname = usePathname();
  const router = useRouter();
  const {isOpen, type, onClose, data} = useModal();
  const isModalOpen = isOpen && type == 'deniedCall'
  const {profile} = data;
  const exitCall = () => {
    const url = queryString.stringifyUrl(
      {
        url: pathname!,
        query: {},
      },
      { skipNull: true }
    );
    onClose();
    router.push(url);
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
    <DialogContent className="bg-direct-sidebar-accent text-white p-0  overflow-hidden w-fit">
        <DialogHeader className="pt-8">
            {/* <DialogTitle className="text-2xl text-center font-bold">
               Incoming call 
            </DialogTitle> */}
        </DialogHeader>
        <div className="p-4 pt-1 flex items-center justify-center flex-col gap-2">
        <UserAvatar src={profile?.imageUrl} className="md:size-16"/>
            <div className="flex flex-col items-center">
              <span>{profile?.name}</span>
              <span className="text-unfocus-grey font-thin leading-3"> Rejected your call, he hates you</span>
            <Image className="my-6" src="/sadding.webp" width={128} height={128} alt="sad"/>
            </div>
            <div className="flex gap-4 mt-2">
              <button onClick={exitCall} className="bg-[#F03A14] p-2 px-4 rounded flex gap-3 items-center hover:opacity-70 transition-opacity"><PhoneMissed/>oh... guess i well exit the call then</button>
            </div>
            {/* <PhoneIncoming/> */}
        </div>
    </DialogContent>
</Dialog>
  )
 
}
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { PhoneCall, PhoneMissed } from "lucide-react";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { useSocket } from "../providers/socket-provider";
import { DialogHeader } from "../ui/dialog";
import UserAvatar from "../user-avatar";

export default function IncomingCall() {
  const router = useRouter();
  const {isOpen, type, onClose, data} = useModal();
  const isModalOpen = isOpen && type == 'incomingCall'
  const {caller, callType} = data;
  const {socket} = useSocket();
  const accept = () => {
    const url = queryString.stringifyUrl(
      {
        url: `/directs/direct/${caller?.id}`,
        query: {
          [callType!]: true
        },
      },
      { skipNull: true }
    );
    onClose();
    router.push(url);
  }

  const deny = () => {
    socket.emit("call_denied", caller);
    onClose();
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
    <DialogContent className="bg-direct-sidebar-accent p-0  overflow-hidden w-fit">
        <DialogHeader className="pt-8">
            {/* <DialogTitle className="text-2xl text-center font-bold">
               Incoming call 
            </DialogTitle> */}
        </DialogHeader>
        <div className="p-4 pt-1 flex items-center justify-center flex-col gap-2">
        <UserAvatar src={caller?.imageUrl} className="md:size-16"/>
            <div className="flex flex-col items-center">
              <span>{caller?.name}</span>
              <span className="text-unfocus-grey dark:font-thin leading-3"> Is calling you, well you accept? </span>
            </div>
            <div className="flex gap-4 mt-2 text-white">
              <button onClick={deny} className="bg-[#F03A14] p-2 px-4 rounded flex gap-3 items-center hover:opacity-70 transition-opacity"><PhoneMissed/>decline</button>
              <button onClick={accept} className="bg-[#00B94D] p-2 px-4 rounded flex gap-3 items-center hover:opacity-70 transition-opacity"><PhoneCall/>accept</button>
            </div>
            {/* <PhoneIncoming/> */}
        </div>
    </DialogContent>
</Dialog>
  )
 
}
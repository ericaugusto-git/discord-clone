import { useModal } from "@/hooks/use-modal-store"
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader } from "../ui/dialog";
import { PhoneIncoming } from "lucide-react";

export default function IncomingCall() {
  const {isOpen, type, onClose} = useModal();
  const isModalOpen = isOpen && type == 'incomingCall'

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
    <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
               Incoming call 
            </DialogTitle>
        </DialogHeader>
        <div className="p-4 pt-1">
            <PhoneIncoming/>
        </div>
    </DialogContent>
</Dialog>
  )
 
}
"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, MessageCircle, MessageSquare, MessageSquareMore, MessageSquareMoreIcon, MessageSquareShareIcon, RefreshCw, Smile } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";



const InviteModal = () => {

    const {onOpen,isOpen, onClose, type, data} = useModal();
    const origin = useOrigin();
    const [copied,setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const isModalOpen = isOpen && type == 'invite';

    const {server} = data;
    const inviteUrl = `${origin}${data.inviteLink}`

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000)
    }

    const onNew = async () => {
        try{
            setIsLoading(true)
            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);
            setIsLoading(false)
            onOpen("invite", {inviteLink: `/invite/${server?.inviteCode}`})
        }catch(error){
            setIsLoading(false)
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    }

    const router = useRouter();






    return ( 
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                       Invite friends 
                    </DialogTitle>
                </DialogHeader>
                <div className="p-4 pt-1">
                    <Label
                    className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                    >
                        Invite link
                    </Label>
                    <div className="flex items-center mt-2 gap-x-2">
                        <Input disabled={isLoading} readOnly value={inviteUrl} className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"/>
                        <Button disabled={isLoading} size="icon" onClick={onCopy} className={copied ? "bg-emerald-300 hover:bg-emerald-300" : ""}>
                            {copied ? <Check className="w-4 h-4"/> : <Copy className="w-4 h-4"/> }
                        </Button>
                    </div>
                       {server && <Button disabled={isLoading} onClick={onNew} variant='link' size="sm" className="text-xs text-zinc-500 mt-4">
                            Generate a new link
                            <RefreshCw className="w-4 h-4 ml-2"/>
                        </Button>}
                </div>
            </DialogContent>
        </Dialog>
     );
}
 
export default InviteModal;
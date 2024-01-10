"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";

import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import qs from "query-string";
import { ChannelType } from "@prisma/client";
import { Hash, Mic, Video } from "lucide-react";

const iconMap = {
    [ChannelType.TEXT]: Hash,
    [ChannelType.VIDEO]: Video,
    [ChannelType.AUDIO]: Mic
}

const DeleteChannelModal = () => {
    const {onOpen,isOpen, onClose, type, data} = useModal();
    const [isLoading, setIsLoading] = useState(false);
    
    const router = useRouter();
    const isModalOpen = isOpen && type == 'deleteChannel'
    // if(!isOpen)
    //     return; 
    const {server, channel} = data;
    const ChannelIcon = iconMap[channel?.type ?? ChannelType.TEXT];

    const onClick = async () => {
        try{
            setIsLoading(true);
            const url = qs.stringifyUrl({
                url: `/api/channels/${channel?.id}`,
                query: {
                    serverId: server?.id,
                }
            })
            const response = await axios.delete(url);
            router.refresh();
            onClose();
            // router.push(`/servers/${server?.id}`);
        }catch(error){
            setIsLoading(false)
            console.log(error)
        } finally{
            setIsLoading(false)
        }
    }


    return ( 
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
            <DialogHeader className="pt-8 px-6">
                <DialogTitle className="text-2xl text-center font-bold">
                    Delete channel
                </DialogTitle>
                <DialogDescription className="text-center flex items-center flex-col text-zinc-500">
                    Are you sure you want to this?  <br/>
                    <span className="flex text-center align-middle gap-x-1">
                    <span className="font-semibold text-rose-500 flex gap-[2px] items-center"> <ChannelIcon className="w-4 h-4"/> {channel?.name} </span>
                    will be permanently deleted.
                    </span>
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className="bg-gray-100 px-6 py-4">
                <div className="flex items-center justify-between w-full">
                    <Button disabled={isLoading} variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button disabled={isLoading} onClick={onClick} variant="destructive">
                        Delete
                    </Button>
                </div>
            </DialogFooter>
            </DialogContent>
        </Dialog>
     );
}
 
export default DeleteChannelModal;
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



const DeleteServerModal = () => {
    const {onOpen,isOpen, onClose, type, data} = useModal();
    const [isLoading, setIsLoading] = useState(false);
    
    const router = useRouter()
    const isModalOpen = isOpen && type == 'deleteServer'
    // if(!isOpen)
    //     return; 
    const {server} = data;

    const onClick = async () => {
        try{
            setIsLoading(true)
            const response = await axios.delete(`/api/servers/${server?.id}`);
            router.refresh();
            router.push("/");
            onClose();
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
                    Delete server
                </DialogTitle>
                <DialogDescription className="text-center text-zinc-500">
                    Are you sure you want to this?  <br/>
                    <span className="font-semibold text-rose-500"> {server?.name} </span>
                    will be permanently deleted.
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
 
export default DeleteServerModal;
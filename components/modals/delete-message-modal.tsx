"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import qs from "query-string";



const DeleteMessageModal = () => {
    const {onOpen,isOpen, onClose, type, data} = useModal();
    const [isLoading, setIsLoading] = useState(false);
    
    const isModalOpen = isOpen && type == 'deleteMessage'
    // if(!isOpen)
    //     return; 
    const {apiUrl, query} = data;
    const onClick = async () => {
        try{
            setIsLoading(true);
            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query
            })
            await axios.delete(url);
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
                    Delete Message
                </DialogTitle>
                <DialogDescription className="text-center flex items-center flex-col text-zinc-500">
                    Are you sure you want to this?  <br/>
                    This message well be permanently deleted.
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
 
export default DeleteMessageModal;
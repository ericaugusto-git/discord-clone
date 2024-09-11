import { useSocket } from "@/components/providers/socket-provider";
import { Member, Message, Profile } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type IncomingCallProps = {
    receiverId: string
}


export const useChatSocket = ({
    receiverId
}: IncomingCallProps) => {
    const { socket } = useSocket();

    useEffect(() => {
        if(!socket){
            return;
        }
    
    }, [])
}
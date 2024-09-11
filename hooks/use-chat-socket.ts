import { useSocket } from "@/components/providers/socket-provider";
import { Member, Message, Profile } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type ChatSocketProps = {
    addKey: string;
    updateKey: string;
    queryKey: string;
}

type MessageWithMemberWithProfile = Message & {member: Member & {profile: Profile}}

export const useChatSocket = ({
    addKey,
    updateKey,
    queryKey
}: ChatSocketProps) => {
    const { socket } = useSocket();
    const queryClient = useQueryClient();

    useEffect(() => {
        if(!socket){
            return;
        }
    
        socket.on(updateKey, (message: MessageWithMemberWithProfile) => {
            queryClient.setQueryData([queryKey], (oldData: any) => {
                //TODO understand this if
                //DONE Checking if old pages exists, if not returns current cache
                if(!oldData || !oldData.pages || oldData.pages.length === 0){
                    return oldData;
                }
                // add updated message to the messages array
                const newData = oldData.pages.map((page: any) => {
                        return {...page, items: page.items.map((item: MessageWithMemberWithProfile) => {
                            if(item.id === message.id){
                                return message;
                            }
                            return item;
                        })}
                    })
                    return {...oldData, pages: newData};
            })
        })

        // listen to new messages
        socket.on(addKey, (message: MessageWithMemberWithProfile) => {
            queryClient.setQueryData([queryKey], (oldData:any) => {
                if(!oldData || !oldData.pages || oldData.pages.length === 0){
                    return {pages: [{
                        items: [message]
                    }]}
                }

                const newData = [...oldData.pages];
                newData[0] = {
                    //TODO understand why add this
                    ...newData[0],
                    //and not just this
                    // DONE Good practice to create a new object to trigger re-render + this adds the new message to the array
                    items: [
                        message,
                        ...newData[0].items
                    ]
                }

                return {
                    ...oldData,
                    pages: newData
                };
            });
        });

        return () => {
            socket.off(addKey)
            socket.off(updateKey)
        }
    }, [queryClient, addKey, socket, updateKey, queryKey])
}
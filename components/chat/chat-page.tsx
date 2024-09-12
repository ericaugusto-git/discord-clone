"use client"

import ChatInput from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";
import { Chat, useCurrentChat } from "@/hooks/use-current-chat-store";
import { ChannelType, Profile } from "@prisma/client";
import { useEffect } from "react";
import { useSocket } from "@/components/providers/socket-provider";
import { useSearchParams } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

type ParamsKey = "channelId" | "directId"

interface ChatPageProps {
    type: "direct" | "channel";
    chatProps: {
        chatId: string;
        apiUrl: string;
        socketUrl: string;
        socketQuery: Record<string, string>;
        paramKey: ParamsKey;
        paramValue: string;
    };
    member?: any;
    currentProfile?: Profile;
    channelType: ChannelType;
    name: string;
    chat: Chat
}

const ChatPage = ({
    type,
    chatProps,
    member,
    currentProfile,
    channelType,
    name,
    chat
}: ChatPageProps) => {
    const {setCurrentChat} = useCurrentChat();
    const searchParams = useSearchParams();
    const { socket } = useSocket();
    const {onOpen} = useModal(); 
    useEffect(() => {
        if(socket){
            console.log("listening to incoming calls")
            socket.on("incoming_call", (data: {caller: Profile, type: string}) => {
                const {caller, type} = data;
                console.log(data)
                onOpen("incomingCall", {caller, callType: type})
            });
            socket.on("call_denied", ( receiverId: string) => {
                console.log("call denied")
                const direct = 'otherMember' in chat! ? chat : null;
                console.log(direct);
                onOpen("deniedCall", {profile: direct?.otherMember})
            })
            // Register the user's directId with the server
        }
      }, [socket]);
    useEffect(() => {
        setCurrentChat(type,chat);
    },[chat, setCurrentChat, type]);

    return (
        <div className="flex gap-bento-gap flex-col h-full">
            {channelType !== ChannelType.TEXT ? (
                <MediaRoom
                    chatId={chatProps.chatId}
                    video={channelType === ChannelType.VIDEO}
                    audio={true}
                    
                />
            ) : (
                <>
                    <ChatMessages
                        member={member}
                        currentProfile={currentProfile}
                        name={name}
                        chatId={chatProps.chatId}
                        type={type}
                        apiUrl={chatProps.apiUrl}
                        paramKey={chatProps.paramKey}
                        paramValue={chatProps.paramValue}
                        socketUrl={chatProps.socketUrl}
                        socketQuery={chatProps.socketQuery}
                    />
                    <ChatInput
                        name={name}
                        type={type}
                        
                        apiUrl={chatProps.socketUrl}
                        query={chatProps.socketQuery}
                    />
                </>
            )}
        </div>
    );
};

export default ChatPage;

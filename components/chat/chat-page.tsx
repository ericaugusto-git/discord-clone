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
    useEffect(() => {

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
                        directPicture={(chat as {otherMember: Profile})?.otherMember?.imageUrl}
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

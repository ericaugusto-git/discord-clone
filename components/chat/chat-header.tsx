"use client"

import { Hash } from "lucide-react";
import MobileToggle from "../mobile-toggle";
import UserAvatar from "../user-avatar";
import SocketIndicator from "../socket-indicator";
import ChatVideoButton from "./chat-video-button";
import { useCurrentChat } from "@/hooks/use-current-chat-store";

interface ChatHeaderProps {
    serverId: string;
    name: string;
    type: "channel" | "conversation";
    imageUrl?: string
}
// {serverId,
//     name,
//     type,
//     imageUrl
const ChatHeader = () => {
    const {type, currentChat} = useCurrentChat();
    // if (!currentChat) return null;
    return ( 
        <div className="text-md font-semibold px-3 flex items-center h-12 bg-bento-item rounded-bento-item-radius">
            {currentChat && (
            <>
                {/* <MobileToggle serverId={serverId}/> */}
                {type === "channel" && (
                    <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2"/>
                )}
                {type === 'conversation'  && (
                    <UserAvatar
                    src={'otherMember' in currentChat ? currentChat.otherMember.imageUrl : ''}
                    className="h-8 w-8 md:h-8 md:w-8 mr-2 text-zinc-500 dark:text-zinc-400"
                    />
                )}
                <p className="font-semibold text-md text-black dark:text-white">
                    {'name' in currentChat && currentChat.name}
                </p>
                <div className="ml-auto flex item-center">
                    {type === "conversation" && (<ChatVideoButton/>)}
                    <SocketIndicator/>
                </div>
                </>
            )}
        </div>
     );
}
 
export default ChatHeader;
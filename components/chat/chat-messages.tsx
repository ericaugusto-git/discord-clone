"use client"

import { DirectMessage, Member, Message, Profile } from "@prisma/client";
import ChatWelcome from "./chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import { Loader2, ServerCrash } from "lucide-react";
import { ElementRef, Fragment, useRef } from "react";
import ChatItem from "./chat-item";
import {format} from "date-fns"; 
import { useChatSocket } from "@/hooks/use-chat-socket";
import { useChatScroll } from "@/hooks/use-chat-scroll";
import styles from './chat.module.css';

interface ChatMessagesProps {
    name:string;
    member: Member;
    currentProfile?: Profile;
    chatId: string;
    apiUrl:string;
    socketUrl: string;
    socketQuery: Record<string, string>;
    paramKey: "channelId" | "directId";
    paramValue: string;
    type: "channel" | "direct";
    directPicture?: string
    
}

const DATE_FORMAT = "d MMM yyyy, HH:mm";

type MessageWithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile
    }
}

type DirectMsgWithProfile = DirectMessage & {profile: Profile}

const ChatMessages = ({
    name, member, currentProfile, chatId, apiUrl, socketUrl, socketQuery, paramKey, paramValue, type, directPicture
}: ChatMessagesProps) => {
    const queryKey = `chat:${chatId}`
    const addKey = `chat:${chatId}:messages`
    const updateKey = `chat:${chatId}:messages:update`
    const {       
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status} = useChatQuery({
        queryKey,
        apiUrl, 
        paramKey,
        paramValue 
    });
    useChatSocket({queryKey, addKey, updateKey})
    const chatRef = useRef<ElementRef<"div">>(null);
    const bottomRef = useRef<ElementRef<"div">>(null);    
    useChatScroll({chatRef, bottomRef, loadMore: fetchNextPage, shouldLoadMore: !isFetchingNextPage && !!hasNextPage, count: data?.pages?.[0]?.items?.length || 0})
   
    if(status === "pending"){
        return (
            <div className="h-full flex flex-col flex-1 justify-center items-center">
                <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4"/>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Loading messages...
                </p>
            </div>
        ) 
    }

    if(status === "error"){
        return (
            <div className="h-full flex flex-col flex-1 justify-center items-center">
                <ServerCrash className="h-7 w-7 text-zinc-500 my-4"/>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Something went wrong :(
                </p>
            </div>
        ) 
    }

    return ( 
        <div  ref={chatRef} className={"h-full flex flex-col py-4 overflow-y-auto scrollbar scrollbar-track-transparent scrollbar-thumb-accent"}>
            {!hasNextPage && (
                <>
            <div className="flex-1"/>
            <ChatWelcome
            type={type}
            name={name}
            directPicture={directPicture}
            />
                </>
            )}

            {hasNextPage && (
                <div className="flex justify-center">
                    {isFetchingNextPage ? (
                        <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4"/>
                    ) : <button onClick={() => fetchNextPage()} className="text-zinc-500 hover:tex-zinc-600 dark:text-zinc-400 text-sx mt-4 dark:hover:text-zinc-300 transition">
                            Load previous messages
                        </button>
                    }
                </div>
            )}
            <div className="flex flex-col-reverse mt-auto">
                {data?.pages?.map((group, i) => (
                    <Fragment key={i}>
                        {group?.items?.map((message: any) => (
                                <ChatItem 
                                currentMember={member}
                                currentProfile={currentProfile}
                                messageMember={message.member}
                                directProfile={message.profile}
                                key={message.id}
                                id={message.id}
                                content={message.content}
                                fileUrl={message.fileUrl}
                                deleted={message.deleted}
                                timestamp={format(new Date(message.createdAt),DATE_FORMAT)}
                                isUpdated={message.updatedAt !== message.createdAt}
                                socketUrl={socketUrl}
                                socketQuery={socketQuery}
                                />
                        ))}
                    </Fragment>
                ))}
            </div>
            <div ref={bottomRef}></div>
        </div>
     );
}
 
export default ChatMessages;
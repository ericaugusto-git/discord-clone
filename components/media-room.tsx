"use client"

import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface MediaRoomProps {
    chatId: string;
    video: boolean;
    audio: boolean;
}

export const MediaRoom = ({
    chatId,
    video, 
    audio
}: MediaRoomProps) => {
    const { data: session } = useSession();
    const [token, setToken] = useState();
    const pathName = usePathname();
    const router = useRouter();
    // this is not very good but it's fine for now
    const onDisconnect = () => {
        const chatRoot = pathName?.includes('direct') ? pathName : pathName?.split('/channels/')?.[0] as string
        router.push(chatRoot);
    }
    useEffect(() => {
        const name = session?.user.username ?? session?.user?.name;

        (async () => {
            try{
                const resp = await fetch(`/api/livekit?room=${chatId}&username=${name}`);
                const data = await resp.json();
                setToken(data.token);
            }catch(error){
                console.log(error);
            }
        })()
    }, [chatId]);
    if(token === ""){
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4"/>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
            </div>
        )
    }

    return (
        <LiveKitRoom
        data-lk-theme="default"
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        token={token}
        connect={true}
        video={video}
        audio={audio}
        onDisconnected={onDisconnect}
        >
            <VideoConference></VideoConference>
        </LiveKitRoom>
    )
}
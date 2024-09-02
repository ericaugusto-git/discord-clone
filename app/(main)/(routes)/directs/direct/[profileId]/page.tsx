import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-messages";
import ChatPage from "@/components/chat/chat-page";
import { MediaRoom } from "@/components/media-room";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { getOrCreateDirect } from "@/lib/direct";
import { redirectToSignIn } from "@clerk/nextjs";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

interface MemberIdPageProps {
    params: {
        profileId: string;
    },
    searchParams: {
        video?: boolean,
        call?: boolean
    }
}

const Direct = async ({params, searchParams}:MemberIdPageProps) => {
    const profile = await currentProfile();
    if(!profile)
        return redirectToSignIn();

    const direct = await getOrCreateDirect(profile.id, params.profileId);
    if(!direct){
        // TODO: warning msg
        return redirect(`/directs`);
    }

    const {profileOne, profileTwo} = direct;

    const otherMember = profileOne.id === profile.id ? profileTwo : profileOne;


    return (
            <ChatPage
                type="direct"
                chatProps={{
                    chatId: direct.id,
                    apiUrl: "/api/direct-messages",
                    socketUrl: "/api/socket/direct-messages",
                    socketQuery: { directId: direct.id },
                    paramKey: "directId",
                    paramValue: direct.id,
                }}
                // member={currentMember}
                channelType={searchParams.video ? ChannelType.VIDEO :  ChannelType.TEXT}
                chat={{otherMember}}
                currentProfile={profile}
                name={otherMember.name}
            />
    );
}
 
export default Direct;
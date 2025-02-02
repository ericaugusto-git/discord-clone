import ChatPage from "@/components/chat/chat-page";
import { currentProfile } from "@/lib/current-profile";
import { getOrCreateDirect } from "@/lib/direct";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

interface MemberIdPageProps {
    params: {
        profileId: string;
    },
    searchParams: {
        video?: boolean,
        audio?: boolean
    }
}

const Direct = async ({params, searchParams}:MemberIdPageProps) => {
    const profile = await currentProfile();
    if(!profile)
        return;

    const direct = await getOrCreateDirect(profile.id, params.profileId);
    if(!direct){
        // TODO: warning msg
        return redirect(`/directs`);
    }

    const {profileOne, profileTwo} = direct;

    const otherMember = profileOne.id === profile.id ? profileTwo : profileOne;

    return (
    <div className="size-full bg-chat-grey rounded-bento-item-radius md:rounded-l-none ">
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
                channelType={searchParams.video ? ChannelType.VIDEO : searchParams.audio ? ChannelType.AUDIO :  ChannelType.TEXT}
                chat={{otherMember}}
                currentProfile={profile}
                name={otherMember.username}
            />
     </div>
    );
}
 
export default Direct;
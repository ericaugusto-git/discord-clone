import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { getOrCreateDirect } from "@/lib/direct";
import { redirectToSignIn } from "@clerk/nextjs";
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
        <div className="flex gap-bento-gap flex-col h-full">
           {searchParams.video && (
            <MediaRoom
            chatId={direct.id}
            video={true}
            audio={true}
            />
           )}
           one:
           {profileOne.name}
           two:
           {profileTwo.name}
           {/* {!searchParams.video && (
            <>
                <ChatMessages
                member={currentMember}
                name={otherMember.profile.name}
                chatId={direct.id}
                type="direct"
                apiUrl="/api/direct-messages"
                paramKey="directId"
                paramValue={direct.id}
                socketUrl="/api/socket/direct-messages"
                socketQuery={{
                    directId: direct.id
                }}
            />
            <ChatInput
            name={otherMember.profile.name}
            type="direct"
            apiUrl="/api/socket/direct-messages"
            query={{
                directId: direct.id
            }}
            />
            </>
           )} */}

        </div>
    );
}
 
export default Direct;
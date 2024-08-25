import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import ChatPage from "@/components/chat/chat-page";

interface ChannelIdPageProps {
    params: {
        serverId: string;
        channelId: string;
    };
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
    const profile = await currentProfile();
    if (!profile) return redirectToSignIn();

    const channel = await db.channel.findUnique({
        where: {
            id: params.channelId,
        },
    });

    const member = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile.id,
        },
    });

    if (!channel || !member) return redirect("/");

    return (
        <ChatPage
            type="channel"
            chatProps={{
                chatId: channel.id,
                apiUrl: "/api/messages",
                socketUrl: "/api/socket/messages",
                socketQuery: { channelId: channel.id, serverId: channel.serverId },
                paramKey: "channelId",
                paramValue: channel.id,
            }}
            chat={channel}
            member={member}
            channelType={channel.type}
            name={channel.name}
        />
    );
};

export default ChannelIdPage;

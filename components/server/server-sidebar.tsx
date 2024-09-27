import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { ChannelType, MemberRole } from "@prisma/client";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { redirect } from "next/navigation";
import CurrentUser from "../current-user";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import ServerHeader from "./server-header";
import ServerMember from "./server-member";
import ServerSearch from "./server-search";
import ServerSection from "./server-section";
import ServerChannel from "./sever-channel";

type ServerSidebarProps = {
    serverId: string
}

const channelIconMap = {
    [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4"/>,
    [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4"/>,
    [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4"/>
}

const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500"/>,
    [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500"/>
}

const ServerSidebar = async ({serverId}: ServerSidebarProps) => {
    const profile = await currentProfile();
    
    if(!profile){
        return <RedirectToSignIn/>;
    }

    const server = await db.server.findUnique({
            where: {
                id: serverId,
            },
            include: {
                channels: {
                    orderBy: {
                        createdAt:"asc" 
                    }
                },
                members: {
                    include:{
                        profile: true
                    },
                    orderBy: {
                        role: "asc"
                    }
                }
            }
        })

    if(!server)
        return redirect("/");

    const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT);
    const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO);
    const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO);
    const members = server?.members.filter((member) => member.profileId !== profile.id);

    const role = server.members.find((member) => member.profileId === profile.id)?.role;

    return ( 
        <div className="flex flex-col h-full text-primary w-full 
        bg-server-sidebar md:rounded-l-bento-item-radius mt-12 pb-12 md:p-0 md:m-0">
            <ServerHeader
            server={server}
            role={role}
            />
            <ScrollArea
            className="flex-1 px-3"
            >
                <div className="mt-2">
                    <ServerSearch data={[
                        {
                            label: "Text Channels",
                            type: "channel",
                            data: textChannels?.map((channel) => ({
                                id: channel.id,
                                name: channel.name,
                                icon: channelIconMap[channel.type]
                            }))
                        },
                        {
                            label: "Voice Channels",
                            type: "channel",
                            data: audioChannels?.map((channel) => ({
                                id: channel.id,
                                name: channel.name,
                                icon: channelIconMap[channel.type]
                            }))
                        },
                        {
                            label: "Video Channels",
                            type: "channel",
                            data: videoChannels?.map((channel) => ({
                                id: channel.id,
                                name: channel.name,
                                icon: channelIconMap[channel.type]
                            }))
                        },
                        {
                            label: "Members",
                            type: "member",
                            data: members?.map((member) => ({
                                id: member.id,
                                name: member.profile.name,
                                icon: roleIconMap[member.role]
                            }))
                        },
                    ]}/>
                </div>
                <Separator
                className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2"
                />
                {!!textChannels?.length && (
                    <div className="mb-2">
                        <ServerSection
                            sectionType="channels"
                            channelType={ChannelType.TEXT}
                            role={role}
                            label="Text Channels"
                        />
                        <div className="space-y-[2px]">
                        {textChannels.map((channel) => (
                            <ServerChannel
                            key={channel.id}
                            channel={channel}
                            role={role}
                            server={server}
                            />
                        ))}
                        </div>
                    </div>
                )}
                {!!audioChannels?.length && (
                    <div className="mb-2">
                        <ServerSection
                            sectionType="channels"
                            channelType={ChannelType.AUDIO}
                            role={role}
                            label="Voice Channels"
                        />
                        <div className="space-y-[2px]">
                        {audioChannels.map((channel) => (
                            <ServerChannel
                            key={channel.id}
                            channel={channel}
                            role={role}
                            server={server}
                            />
                        ))}
                        </div>
                    </div>
                )}
                {!!videoChannels?.length && (
                    <div className="mb-2">
                        <ServerSection
                            sectionType="channels"
                            channelType={ChannelType.VIDEO}
                            role={role}
                            label="Video Channels"
                        />
                    <div className="space-y-[2px]">
                        {videoChannels.map((channel) => (
                            <ServerChannel
                            key={channel.id}
                            channel={channel}
                            role={role}
                            server={server}
                            />
                        ))}
                    </div>
                    </div>
                )}
                {!!members?.length && (
                    <div className="mb-2">
                        <ServerSection
                            sectionType="members"
                            role={role}
                            server={server}
                            label="Members"
                        />
                    <div className="space-y-[2px]">
                        {members.map((member) => (
                            <ServerMember 
                            key={member.id}
                            member={member}
                            server={server}
                            />
                        ))}
                    </div>
                    </div>
                )}
            </ScrollArea>
            <CurrentUser profile={profile}/>
        </div>
     );
}
 
export default ServerSidebar;
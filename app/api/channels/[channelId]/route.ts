import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { channel } from "diagnostics_channel";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, {params}: {params: {channelId: string}}){
    try{
        const profile = await currentProfile();
        
        if(!profile){
            throw new NextResponse("Unauthorized", {status: 401});
        }
        const { searchParams } = new URL(req.url);
        const serverId = searchParams.get("serverId");
        if(!serverId){{
            return new NextResponse("Server ID missing", {status: 400});
        }};

        if(!params?.channelId){
            return new NextResponse("Channel ID missing", {status: 400});
        }
        
        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data: {
                channels: {
                    delete: {
                        id: params?.channelId,
                        name: {
                            //TODO can i insensitive case?
                           not: "general"
                        }
                    }
                }
            }
        })
        return NextResponse.json(server)
    }catch(error){
        console.log("[FROM_CHANNEL_ID_DELETE]", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}

export async function PATCH(req: Request, {params}: {params: {channelId: string}}){
    try{
        const profile = await currentProfile();
        
        if(!profile){
            throw new NextResponse("Unauthorized", {status: 401});
        }
        const { searchParams } = new URL(req.url);
        const serverId = searchParams.get("serverId");
        if(!serverId){{
            return new NextResponse("Server ID missing", {status: 400});
        }};

        if(!params?.channelId){
            return new NextResponse("Channel ID missing", {status: 400});
        }
        
        const { name, type }: {name: string, type: ChannelType} = await req.json();

        if(name.toLowerCase() === 'general'){
            return new NextResponse("Name cannot be 'general'", {status: 400});
        }


        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data: {
                channels: {
                    update: {
                        where: {
                            id: params?.channelId,
                            NOT: {
                                //TODO can i insensitive case?
                               name: "general"
                            }
                        },
                        data: {
                            name: name,
                            type: type
                        }
                    }
                }
            }
        })
        return NextResponse.json(server)
    }catch(error){
        console.log("[FROM_CHANNEL_ID_PATCH]", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}
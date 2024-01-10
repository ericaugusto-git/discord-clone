import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request){
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
        const {name, type}: {name: string, type: ChannelType} = await req.json();
        if(name.toLowerCase() === "general"){
            return new NextResponse("Name cannot be \"general\"", {status: 400});
        }

        const channel = await  db.server.update({
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
                    create: {
                        profileId: profile.id,
                        name: name,
                        type: type
                    }
                }
            }
        })
        return NextResponse.json(channel);
    }catch(error){
        console.log("[FROM_CHANNELS_POST]", error);
        return new NextResponse("Internal Error", {status: 500})
        }
}


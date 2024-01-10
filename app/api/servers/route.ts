import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

//Create server
export async function POST(request: Request) {
    try{
        const profile = await currentProfile();

        if(!profile){
            throw new NextResponse("Unauthorized", {status: 401});
        }
        
       const {name, imageUrl} = await request.json();
       const server = await db.server.create({
            data: {
                profileId: profile.id,
                name: name,
                imageUrl: imageUrl,
                inviteCode: uuidv4(),
                members:{
                    create: {
                        profileId: profile.id,
                        role: MemberRole.ADMIN
                    }
                },
                channels: {
                    create: {
                        name: "general",
                        type: ChannelType.TEXT,
                        profileId: profile.id
                    }
                }
            }
        })
        return NextResponse.json(server);
    }catch(error){
        console.log("[FROM_SERVERS_POST]", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}

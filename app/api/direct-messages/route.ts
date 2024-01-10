import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { DirectMessage, Message } from "@prisma/client";
import { NextResponse } from "next/server";

const MESSAGES_BATCH = 15;

export async function GET(req: Request){
    try{
        const profile = await currentProfile();

        if(!profile){
            throw new NextResponse("Unauthorized", {status: 401});
        }

        const {searchParams} = new URL(req.url);

        const cursor = searchParams.get("cursor")
        const conversationId = searchParams.get("conversationId")
        if(!conversationId){
            throw new NextResponse("Conversation ID missing", {status: 401});
        }

        let messages: DirectMessage[] = [];

        if(cursor){
            messages = await db.directMessage.findMany({
                take: MESSAGES_BATCH,
                skip: 1,
                cursor: {
                    id: cursor
                },
                where: {
                    conversationId
                },
                include: {
                    member: {
                        include: {
                            profile: true
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc"
                }
            })
        }else{
            messages = await db.directMessage.findMany({
                take: MESSAGES_BATCH,
                where: {
                    conversationId
                },
                include: {
                    member: {
                        include: {
                            profile: true
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc"
                }
            });
        }

        let nextCursor = messages.length === MESSAGES_BATCH ? messages[MESSAGES_BATCH - 1]?.id : null;
        return NextResponse.json({
            items: messages,
            nextCursor
        })
    }catch(error){
        console.log("[FROM_DIRECT_MESSAGE_GET]",error);
        return new NextResponse("Internal Error", {status: 500});
    }
}
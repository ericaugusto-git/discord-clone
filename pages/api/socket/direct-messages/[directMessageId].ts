import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { MemberRole } from "@prisma/client";
import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo){
    try{
        if(req.method !== "DELETE" && req.method !== "PATCH"){
            return res.status(405).json({error: "Method not allowed"});
        }

        const profile = await currentProfilePages(req);

        const { directMessageId, conversationId } = req.query;
        const {content} = req.body;

        if(!profile){
            return res.status(401).json({error: "Unauthorized"})
        }
        if(!directMessageId){
            return res.status(401).json({error: "Direct Message ID missing"})
        }
        if(!conversationId){
            return res.status(401).json({error:  "Conversation ID missing"})
        }
        if(req.method === "PATCH" && !content){
            return res.status(401).json({error:  "Content missing"})
        }

        const conversation = await db.conversation.findFirst({
            where: {
                id: conversationId as string,
                OR: [
                    {
                        memberOne: {
                            profileId: profile.id
                        }
                    },
                    {
                        memberTwo: {
                            profileId: profile.id
                        }
                    }
                ]
            },
            include: {
                memberOne: {
                    include: {
                        profile: true
                    }
                },
                memberTwo: {
                    include: {
                        profile: true
                    }
                }
            }
        })

        
        if(!conversation){
            return res.status(404).json({message: "Conversation not found"}); 
        }

        const member = conversation.memberOne.profileId === profile.id ? conversation.memberOne : conversation.memberTwo;
        if(!member){
            return res.status(404).json({message: "Member not found"}); 
        }

        let directMessage = await db.directMessage.findFirst({
            where: {
                id: directMessageId as string,
                conversationId: conversationId as string
            },
            include: {
                member: {
                    include: {
                        profile: true
                    }
                }
            }
        })

        if(!directMessage || directMessage.deleted){
            return res.status(404).json({message: "Message not found"}); 
        }

        const isMessageOwner = directMessage.memberId === member.id;
        const isModOrAdmin = member.role === MemberRole.ADMIN || MemberRole.MODERATOR;
        if(req.method === "DELETE"){
            if(!isModOrAdmin && !isMessageOwner){
                return res.status(401).json({error: "Unauthorized"})
            }
                let deleteMessage = "This message has been deleted";
                deleteMessage += isMessageOwner ? "." : isModOrAdmin ? " by a moderator of the server." : "."
                console.log(deleteMessage)
                directMessage = await db.directMessage.update({
                    where: {
                        id: directMessageId as string,
                        conversationId: conversationId as string
                    },
                    data: {
                        fileUrl: null,
                        content: deleteMessage,
                        deleted: true
                    },
                    include: {
                        member: {
                            include: {
                                profile: true
                            }
                        }
                    }
                })
            
        }
        if(req.method === "PATCH"){
            if(!isMessageOwner){
                return res.status(401).json({error: "Unauthorized"})
            }
            directMessage = await db.directMessage.update({
                    where: {
                        id: directMessageId as string,
                        conversationId: conversationId as string
                    },
                    data: {
                        content,
                    },
                    include: {
                        member: {
                            include: {
                                profile: true
                            }
                        }
                    }
                })
            
        }
        const updateKey = `chat:${conversationId}:messages:update`

        res?.socket?.server?.io?.emit(updateKey, directMessage);

        return res.status(200).json(directMessage);
    }catch(error){
        console.log("[FROM_MESSAGE_ID]", error);
        return res.status(500).json({error: "Ïnternal Error"})
    }
}
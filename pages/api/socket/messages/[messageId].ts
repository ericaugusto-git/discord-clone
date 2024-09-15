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

        const {messageId, serverId, channelId} = req.query;
        const {content} = req.body;

        if(!profile){
            return res.status(401).json({error: "Unauthorized"})
        }
        if(!serverId){
            return res.status(401).json({error: "Server ID missing"})
        }
        if(!channelId){
            return res.status(401).json({error:  "Channel ID missing"})
        }
        if(req.method === "PATCH" && !content){
            return res.status(401).json({error:  "Content missing"})
        }

        const server = await db.server.findFirst({
            where:{
                id: serverId as string,
                members: {
                    some: {
                        profileId: profile?.id
                    }
                }
            },
            include: {
                members: true
            }
        });

        if(!server){
            return res.status(404).json({message: "Server not found"});
        }

        const channel = await db.channel.findFirst({
            where: {
                id: channelId as string,
                serverId: serverId as string
            }
        });

        if(!channel){
            return res.status(404).json({message: "Channel not found"}); 
        }

        const member = server.members.find((member) => member.profileId === profile.id);
        if(!member){
            return res.status(404).json({message: "Member not found"}); 
        }

        let message = await db.message.findFirst({
            where: {
                id: messageId as string,
                channelId: channelId as string
            },
            include: {
                member: {
                    include: {
                        profile: true
                    }
                }
            }
        })

        if(!message || message.deleted){
            return res.status(404).json({message: "Message not found"}); 
        }

        const isMessageOwner = message.memberId === member.id;
        const isModOrAdmin = member.role === MemberRole.ADMIN || MemberRole.MODERATOR;
        if(req.method === "DELETE"){
            if(!isModOrAdmin && !isMessageOwner){
                return res.status(401).json({error: "Unauthorized"})
            }
                let deleteMessage = "This message has been deleted";
                deleteMessage += isMessageOwner ? "." : isModOrAdmin ? " by a moderator of the server." : "."
                message = await db.message.update({
                    where: {
                        id: messageId as string,
                        channelId: channelId as string
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
            message = await db.message.update({
                    where: {
                        id: messageId as string,
                        channelId: channelId as string
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
        const updateKey = `chat:${channelId}:messages:update`

        res?.socket?.server?.io?.emit(updateKey, message);

        return res.status(200).json(message);
    }catch(error){
        console.log("[FROM_MESSAGE_ID]", error);
        return res.status(500).json({error: "Ïnternal Error"})
    }
}
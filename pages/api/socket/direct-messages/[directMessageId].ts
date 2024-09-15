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

        const { directMessageId, directId } = req.query;
        const {content} = req.body;

        if(!profile){
            return res.status(401).json({error: "Unauthorized"})
        }
        if(!directMessageId){
            return res.status(401).json({error: "Direct Message ID missing"})
        }
        if(!directId){
            return res.status(401).json({error:  "Direct ID missing"})
        }
        if(req.method === "PATCH" && !content){
            return res.status(401).json({error:  "Content missing"})
        }

        const direct = await db.direct.findFirst({
            where: {
                id: directId as string,
                OR: [
                    {
                            profileOneId: profile.id
                    },
                    {
                        profileTwoId: profile.id
                    }
                ]
            },
            include: {
                profileOne: true,
                profileTwo: true
            }
        })

        
        if(!direct){
            return res.status(404).json({message: "Direct not found"}); 
        }

        const convoProfile = direct.profileOneId === profile.id ? direct.profileOne : direct.profileTwo;
        if(!convoProfile){
            return res.status(404).json({message: "convoProfile not found"}); 
        }

        let directMessage = await db.directMessage.findFirst({
            where: {
                id: directMessageId as string,
                directId: directId as string
            },
            include: {
                profile: true
            }
        })

        if(!directMessage || directMessage.deleted){
            return res.status(404).json({message: "Message not found"}); 
        }

        const isMessageOwner = directMessage.profileId === convoProfile.id;
        if(!isMessageOwner){
            return res.status(401).json({error: "Unauthorized! Not the message owner."})
        }
        if(req.method === "DELETE"){
                let deleteMessage = "This message has been deleted";
                directMessage = await db.directMessage.update({
                    where: {
                        id: directMessageId as string,
                        directId: directId as string
                    },
                    data: {
                        fileUrl: null,
                        content: deleteMessage,
                        deleted: true
                    },
                    include: {
                        profile: true
                    }
                })
            
        }
        if(req.method === "PATCH"){
            directMessage = await db.directMessage.update({
                    where: {
                        id: directMessageId as string,
                        directId: directId as string
                    },
                    data: {
                        content,
                    },
                    include: {
                       profile: true
                    }
                })
        }
        const updateKey = `chat:${directId}:messages:update`

        res?.socket?.server?.io?.emit(updateKey, directMessage);

        return res.status(200).json(directMessage);
    }catch(error){
        console.log("[FROM_MESSAGE_ID]", error);
        return res.status(500).json({error: "Ïnternal Error"})
    }
}
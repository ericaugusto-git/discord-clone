import { channel } from 'diagnostics_channel';
import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo){
    if(req.method !== "POST"){
        return res.status(405).json({error: "Method not allowed"})
    }
    try{
        const profile = await currentProfilePages(req);
        const {content, fileUrl} = req.body;
        console.log(req.body);
        const {directId} = req.query;

        
        if(!profile){
            return res.status(401).json({error: "Unauthorized"})
        }

        if(!directId){
            return res.status(401).json({error: "Direct ID missing"})
        }

        if(!content){
            return res.status(401).json({error:  "Content missing"})
        }

        
        const direct = await db.direct.findFirst({
            where: {
                id: directId as string,
                OR: [
                    {
                        profileOne: {
                            id: profile.id
                        }
                    },
                    {
                        profileTwo: {
                            id: profile.id
                        }
                    }
                ]
            },
            include: {
                profileOne: true,
                profileTwo: true
            }
        });

        if(!direct){
            return res.status(404).json({message: "Direct not found"}); 
        }

        const convoProfile = direct.profileOne.id === profile.id ? direct.profileOne : direct.profileTwo;
        if(!convoProfile){
            return res.status(404).json({message: "Member not found"}); 
        }

        const message = await db.directMessage.create({
            data: {
                content,
                fileUrl,
                directId: directId as string,
                profileId: convoProfile.id
            },
            include: {
                profile: true
                // member: {
                //     include: {
                //         profile: true
                //     }
                // }
            }
        })

        const channelKey = `chat:${directId}:messages`;

        res?.socket?.server?.io?.emit(channelKey, message);

        return res.status(200).json(message);
    }catch(error){
        console.log("[DIRECT_MESSAGES_POST]", error);
        return res.status(500).json({message: "Internal Error"})
    }
}
import { channel } from 'diagnostics_channel';
import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo){
    console.log('hey i"m here')
    if(req.method !== "POST"){
        return res.status(405).json({error: "Method not allowed"})
    }
    try{
 
        // // emit new message to socket io
        // res?.socket?.server?.io?.emit(channelKey, message);

        // return res.status(200).json(message);
    }catch(error){
        console.log("[DIRECT_MESSAGES_POST]", error);
        return res.status(500).json({message: "Internal Error"})
    }
}
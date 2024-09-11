import { Server as NetServer } from "net";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io"
import {NextApiResponseServerIo} from "@/types"
import { currentProfilePages } from "@/lib/current-profile-pages";
import { currentProfile } from "@/lib/current-profile";
import { getAuth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { Profile } from "@prisma/client";

export const config = {
    api: {
        bodyParser: false
    }
};



const ioHandler = async (req: NextApiRequest, res: NextApiResponseServerIo) => {
    console.log(res);
    if(!res.socket.server.io){
        const path = "/api/socket/io";
        const httpServer: NetServer = res.socket.server as any;
        // @ts-ignore
        const io = new ServerIO(httpServer, {
            path: path,
            addTrailingSlash: false,
            pingTimeout: 60000,  // 60 seconds
            pingInterval: 25000,  // 25 seconds
            transports: ["websocket"],
            cors: {
                origin: process.env.NEXT_PUBLIC_SITE_URL!,
                methods: ["GET", "POST"],
                credentials: false,
              }
        })
        console.log("io: ", io);
        res.socket.server.io = io;
        io.on('error', (err) => {
            console.log(err);
        })
        io.on('connection', (socket) => {
            console.log('Client connected:', socket.id);

            socket.on('disconnect', (reason) => {
                console.log('Client disconnected:', socket.id, 'Reason:', reason);
            });
        });
        io.engine.on("connection_error", (err) => {
            console.log("Connection error:", err);
        });
        // const userSocketMap = new Map<string, Profile>(); // Key: userId, Value: socketId
        // const userSocketMap2 = new Map<string, string>(); // Key: userId, Value: socketId
        // io.on('connection',async (socket) => {
        //     // console.log(connectedSockets);
        //     socket.on("register_profile", (profile: Profile) => {
        //         userSocketMap.set(socket.id, profile);
        //         userSocketMap2.set(profile.id, socket.id);
        //         console.log("Registred this: ", userSocketMap);
        //         console.log(userSocketMap2)
        //         socket.on("disconnect", () => {
        //           userSocketMap.delete(profile.id);
        //         });
        //       });

    
        //     // Emit the "incoming_call" event when needed
        //     socket.on('incoming_call', (data) => {

        //     const { receiverId } = data;

        //     console.log("server socket aaaaaa")
        //     // console.log(data);
        //     // console.log("profile here: ")
        //     // console.log(profile)
        //     // console.log(userSocketMap)
        //     const receiverSocketId = userSocketMap2.get(receiverId)?.toString();
        //     // quem tá emitindo o evento é o caller ent isso da certo
        //     const callerProfile = userSocketMap.get(socket.id)
        //     console.log("callerProfile: ", callerProfile);
        //     console.log("receiverSocketId: ", receiverSocketId)
        //     // console.log("receiverSocketId: ", receiverSocketId);
        //     // if(!receiverSocketId)
        //     //     return;
        //     // // Emit "incoming_call" to the specified receiver
        //     // io.to(receiverSocketId).emit('incoming_call', receiverId);
        //     });
    
        //     socket.on('disconnect', () => {
        //     console.log('User disconnected:', socket.id);
        //     });
        // });
    }

    

    res.end();
}

export default ioHandler;
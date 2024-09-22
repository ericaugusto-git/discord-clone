import { NextApiResponseServerIo } from "@/types";
import { Profile } from "@prisma/client";
import { NextApiRequest } from "next";
import { Server } from "socket.io";

export const config = {
    api: {
        bodyParser: false
    }
};



const ioHandler = async (req: NextApiRequest, res: NextApiResponseServerIo) => {
    if(!res.socket.server.io){
        // @ts-ignore
        const io = new Server(res.socket.server, {
            path: "/api/socket/io"
        });
        res.socket.server.io = io;
        const profiles = new Map<string, Profile>(); // Key: socketId, Value: profile
        const socketIds = new Map<string, string>(); // Key: profileId, Value: socketId
        io.on("connection", (socket) => {
         socket.on("register_profile", (profile: Profile) => {
                profiles.set(socket.id, profile);
                socketIds.set(profile.id, socket.id);
                socket.on("disconnect", () => {
                  profiles.delete(profile.id);
                });
              });
              // receiverId = profile ID of the one receiving the call/message
              socket.on("new_message", (data) => {
                const {receiverId, message, sender} = data;
                const receiverSocketId = socketIds.get(receiverId)?.toString();
                if(!receiverSocketId)
                  return;

                io.to(receiverSocketId!).emit('new_message', {message, sender})
              });

              socket.on('incoming_call', (data) => {

                const { receiverId, type } = data;

                const receiverSocketId = socketIds.get(receiverId)?.toString();
                // quem tá emitindo o evento é o caller então isso da certo
                const caller = profiles.get(socket.id)

                io.to(receiverSocketId!).emit('incoming_call', {caller, type});
                });
          socket.on("call_denied", (caller: Profile) => {
            const socketId = socketIds.get(caller.id);
            const receiver = profiles.get(socketId!)
            io.to(socketId!).emit("call_denied", receiver)
          })


    
     
    
          // Handle custom events
          socket.on("message", (msg) => {
            io.emit("message", msg); // Broadcast to all clients
          });
        });
    }

    

    res.end();
}

export default ioHandler;
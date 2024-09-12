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
    console.log(res);
    if(!res.socket.server.io){
        console.log("Socket is initializing");
        // @ts-ignore
        const io = new Server(res.socket.server, {
            path: "/api/socket/io"
        });
        res.socket.server.io = io;
        const profiles = new Map<string, Profile>(); // Key: socketId, Value: profile
        const socketIds = new Map<string, string>(); // Key: profileId, Value: socketId
        io.on("connection", (socket) => {
          console.log("A user connected");
         socket.on("register_profile", (profile: Profile) => {
                profiles.set(socket.id, profile);
                console.log(profiles)
                socketIds.set(profile.id, socket.id);
                console.log("Registred this: ", profiles);
                console.log(socketIds)
                socket.on("disconnect", () => {
                  profiles.delete(profile.id);
                });
              });
              socket.on('incoming_call', (data) => {

                const { receiverId, type } = data;

                const receiverSocketId = socketIds.get(receiverId)?.toString();
                // quem tá emitindo o evento é o caller ent isso da certo
                const caller = profiles.get(socket.id)

                io.to(receiverSocketId!).emit('incoming_call', {caller, type});
                });
          socket.on("call_denied", (caller: Profile) => {
            const socketId = socketIds.get(caller.id);
            io.to(socketId!).emit("call_denied")
          })


    
          socket.on("disconnect", () => {
            console.log("A user disconnected");
          });
    
          // Handle custom events
          socket.on("message", (msg) => {
            console.log("Message received: ", msg);
            io.emit("message", msg); // Broadcast to all clients
          });
        });
    }

    

    res.end();
}

export default ioHandler;
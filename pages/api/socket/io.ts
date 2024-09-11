import { NextApiResponseServerIo } from "@/types";
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
    
        io.on("connection", (socket) => {
          console.log("A user connected");
    
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
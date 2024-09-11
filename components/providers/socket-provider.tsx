"use client";

import { 
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import { io as ClientIO } from "socket.io-client";

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ 
  children 
}: { 
  children: React.ReactNode 
}) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_SITE_URL!);
    // const socketInstance =  io("http://localhost:3000", {
    //   path: "/api/socket/io",
    //   transports: ["websocket"]
    // });
    
    const socketInstance = new (ClientIO as any)("http://localhost:3000", {
      path: "/api/socket/io"
    });


    socketInstance.on("error", (err: any) => {
      console.log("error: ", err)
    })

    socketInstance.on("connect_error", (err: any) => {
      // the reason of the error, for example "xhr poll error"
      console.log(err);

    });

    socketInstance.on("connect", () => {
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocket(socketInstance as any);

    return () => {
      socketInstance.disconnect();
    }
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}
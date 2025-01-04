"use client";

import { useModal } from "@/hooks/use-modal-store";
import useRedirectToDirect from "@/hooks/use-redirect-to-direct";
import { Profile } from "@prisma/client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import { io as ClientIO } from "socket.io-client";
import { toast } from "sonner";

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
  const {onOpen} = useModal(); 
  const {redirectToDirect } = useRedirectToDirect();
  const pathName = usePathname();

  useEffect(() => {
    // const socketInstance =  io("http://localhost:3000", {
    //   path: "/api/socket/io",
    //   transports: ["websocket"]
    // });
    
    const socketInstance = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL, {
      path: "/api/socket/io",
      secure: true
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

      socketInstance.on("incoming_call", (data: {caller: Profile, type: string}) => {
          const {caller, type} = data;
          onOpen("incomingCall", {caller, callType: type})
      });
      socketInstance.on("call_denied", ( profile: Profile) => {
        onOpen("deniedCall", {profile})
      })

      socketInstance.on("new_message", (data: {message: string, sender: Profile }) => {
        const {message, sender} = data;
        if(window.location.href?.split('/').includes(sender.id)){
          return;
        }
        
        const notificationId = toast(
          <div onClick={() => {toast.dismiss(notificationId); redirectToDirect(sender.id)}} className="flex items-center w-full cursor-pointer">
            {sender.imageUrl && (
              <Image
                src={sender.imageUrl!}
                alt="User Photo"
                width={40}
                height={40}
                style={{ borderRadius: '50%', marginRight: '10px' }}
              />
            )}
            <div>
              <strong>{sender.name} sent you a new message</strong>
              <p className="line-clamp-3">{message}</p>
            </div>
            <button
        onClick={(e) => {e.stopPropagation();  toast.dismiss(notificationId)}}
        className="p-2 size-fit dark:bg-white text-white ml-auto dark:text-black bg-black text-center rounded-sm"
      >
        X
      </button>
          </div>
          ,
          {duration: 5000}
        );
      })

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
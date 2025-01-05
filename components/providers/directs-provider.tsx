"use client"

import { DirectWithProfile } from "@/lib/direct"
import { Dispatch,createContext, useContext, useEffect, useState } from "react"
import { useSocket } from "./socket-provider";
import axios from "axios";
import { useSession } from "next-auth/react";

const DirectsContext = createContext<{directs: DirectWithProfile[] | null, setDirects: Dispatch<DirectWithProfile[] | null>} | undefined>(undefined);

export default function useDirects (){
    const context = useContext(DirectsContext);
    if (context === undefined) {
      throw new Error('useDirects must be used within a DirectsProvider');
    }
    return context;
}

export const DirectsProvider = ({children}: {children: React.ReactNode}) => {
    const [directs, setDirects] = useState<DirectWithProfile[] | null>(null);
    const {socket} = useSocket();
    const session = useSession();
    useEffect(() => {
      const getDirects = async () => {
          const directs = (await axios.get('/api/directs')).data;
          setDirects(directs);
      } 
      if(socket){
        socket.on("new_message", async () => {
          getDirects();
        });
      }
      if(session.data?.user.id){
        getDirects();
      }
    }, [socket, session]);
    return <DirectsContext.Provider value={{directs, setDirects}}>
        {children}
    </DirectsContext.Provider>
}
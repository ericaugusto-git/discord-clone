"use client"

import { DirectWithProfile } from "@/lib/direct"
import { Dispatch,createContext, useContext, useEffect, useState } from "react"
import { useSocket } from "./socket-provider";
import axios from "axios";

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
    useEffect(() => {
      const getDirects = async () => {
          const directs = (await axios.get('/api/directs')).data;
          setDirects(directs);
      } 
      socket.on("new_message", async () => {
        getDirects();
      });
      getDirects();
    }, [socket]);
    return <DirectsContext.Provider value={{directs, setDirects}}>
        {children}
    </DirectsContext.Provider>
}
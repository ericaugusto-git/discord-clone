"use client"

import { Profile } from "@prisma/client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useSocket } from "./socket-provider";

const CurrentProfileContext = createContext<{ profile: Profile | null } | undefined>(undefined);

export const useCurrentProfile = () => {
  const context = useContext(CurrentProfileContext);
  if (context === undefined) {
    throw new Error('useCurrentProfile must be used within a SocketProvider');
  }
  return context;
};

export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const {socket} = useSocket();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = (await axios.get('/api/current-profile')).data
        if(socket)
        socket.emit("register_profile", profile)
        setProfile(profile);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [socket]);

  if (loading) {
    return             <div className="flex flex-col flex-1 justify-center items-center w-full h-full">
    <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4"/>
    <p className="text-xs text-zinc-500 dark:text-zinc-400">Preparing everything :) ...</p>
</div>;
  }

  return (
    <CurrentProfileContext.Provider value={{ profile }}>
      {children}
    </CurrentProfileContext.Provider>
  );
};

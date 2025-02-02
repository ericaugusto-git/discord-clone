"use client"

import { Profile } from "@prisma/client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { createContext, Dispatch, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { useSocket } from "./socket-provider";
import { useSession } from "next-auth/react";

const CurrentProfileContext = createContext<{ profile: Profile | null, setProfile: Dispatch<Profile | null> } | undefined>(undefined);

export const useCurrentProfile = () => {
  const context = useContext(CurrentProfileContext);
  if (context === undefined) {
    throw new Error('useCurrentProfile must be used within a CurrentUserProvider');
  }
  const {profile, setProfile} = context;
  const {socket} = useSocket();

  if(!profile){
    const fetchProfile = async () => {
      try {
        const profile = (await axios.get('/api/current-profile')).data
        if(socket)
          socket.emit("register_profile", profile)
        setProfile(profile);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };
    fetchProfile();
  }
  return context;
};

export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const session= useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const initialMount = useRef(true);
  const {socket} = useSocket();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if(initialMount.current) setLoading(true);
        const profile = (await axios.get('/api/current-profile')).data
        if(socket && profile){
          initialMount.current = false;
          socket.emit("register_profile", profile)
        }
          
        setProfile(profile);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };
    if(session.data?.user.id && profile?.id != session.data.user.id){
      fetchProfile();
    }
  }, [socket, session]);

  useEffect(() => {
    setLoading((prev) => {if(session.status === 'unauthenticated') return false; else return prev});
  }, [session])

  if (loading) {
    return             <div className="flex flex-col flex-1 justify-center items-center w-full h-full">
    <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4"/>
    <p className="text-xs text-zinc-500 dark:text-zinc-400">Preparing everything :) ...</p>
</div>;
  }

  return (
    <CurrentProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </CurrentProfileContext.Provider>
  );
};

"use client"

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { currentProfile } from "@/lib/current-profile";
import { Profile } from "@prisma/client";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
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
    // Optionally, you can render a loading indicator here
    return <div>Loading...</div>;
  }

  return (
    <CurrentProfileContext.Provider value={{ profile }}>
      {children}
    </CurrentProfileContext.Provider>
  );
};

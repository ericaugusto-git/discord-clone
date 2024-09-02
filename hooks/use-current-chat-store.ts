import { Channel, Profile, Server } from "@prisma/client";
import { create } from "zustand";

export type ChatType = "channel" | "direct" | null;
export type Chat = Channel | {otherMember: Profile}  | null 
type CurrentChatStore = {
    currentChat: Chat,
    type: ChatType,
    setCurrentChat: (type: ChatType, currentChat: Chat) => void
}

export const useCurrentChat = create<CurrentChatStore>((set) => ({
    currentChat: null,
    type: null,
    setCurrentChat: (type, currentChat) => set({ type, currentChat})
}));
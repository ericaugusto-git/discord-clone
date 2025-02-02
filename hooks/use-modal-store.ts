import { ServerWithMembersWithProfiles } from "@/types";
import { Channel, ChannelType, Profile, Server } from "@prisma/client";
import { create } from "zustand"

export type ModalType = "createServer" | "invite" | "editServer" | 
"members" | "createChannel" | "leaveServer" | "deleteServer" | "deleteChannel"
| "editChannel" | "messageFile" | "deleteMessage" | "incomingCall" | "deniedCall";

type ModalData = {
    server?: Server,
    inviteLink?: string;
    channel?: Channel,
    channelType?: ChannelType,
    apiUrl?: string,
    query?: Record<string, any>,
    caller?: Profile,
    callType?: string,
    profile?: Profile
}

type ModalStore = {
    type: ModalType | null,
    data: ModalData,
    isOpen: boolean,
    onOpen: (type: ModalType, data?: ModalData) => void,
    onClose: () => void
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({isOpen: true, type, data}),
    onClose: () => set({type: null, isOpen: false})
}))
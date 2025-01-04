"use client"

import { Member, MemberRole, Profile } from "@prisma/client";
import UserAvatar from "../user-avatar";
import ActionTooltip from "../action-tooltip";
import { Edit, FileIcon, ShieldAlert, ShieldCheck, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import qs from "query-string";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { useModal } from "@/hooks/use-modal-store";
import { useParams, useRouter } from "next/navigation";
import useRedirectToDirect from "@/hooks/use-redirect-to-direct";


interface ChatItemProps {
    id: string;
    content: string;
    
    messageMember?: Member & {
        profile: Profile
    };
    currentMember?: Member;

    currentProfile?: Profile,
    directProfile?: Profile,
    
    timestamp: string;
    fileUrl: string | null;
    deleted: boolean;
    isUpdated: boolean;
    socketUrl: string;
    socketQuery: Record<string, string>
}

const roleIconMap = {
    "GUEST": null,
    "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500"/>,
    "ADMIN": <ShieldAlert className="h-4 w-4 ml-2 text-rose-500"/>
}

const formSchema = z.object({
    content: z.string().min(1)
})

type FormSchemaType = z.infer<typeof formSchema>

export const ChatItem = (
    {
        id,
        content,
        
        currentMember,
        messageMember,

        currentProfile,
        directProfile,
        
        timestamp, 
        fileUrl, deleted,
        isUpdated,
        socketUrl, socketQuery
    }: ChatItemProps
) => {
    const [isEditing, setIsEditing] = useState(false);
    const {redirectToDirect} = useRedirectToDirect();
    const {onOpen} = useModal();

    const params = useParams();
    const router = useRouter();

    let eventExists = false;

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: ""
        }
    });

    const onSubmit = async (values: FormSchemaType) => {
        try{
            const url = qs.stringifyUrl({
                url: `${socketUrl}/${id}`,
                query: socketQuery
            });
            await axios.patch(url, values);
            form.reset();
            setIsEditing(false);
        }catch(error){
            console.log(error)
        }
    }

    const isLoading = form.formState.isSubmitting

    
    useEffect(() => {
        const handleKeydown = (event: any) => {
            if(event.key === "Escape" || event.code === 27){
                setIsEditing(false);
            }
        }
        
        window.addEventListener("keydown", handleKeydown);
        return () => window.removeEventListener("keydown", handleKeydown);
    }, [])

    useEffect(() => {
        form.reset({
            content: content
        })
    }, [content, form])

    const fileType = fileUrl?.split(".").pop();
    const isPdf = fileType === "pdf" && fileUrl;
    const isImage = !isPdf && fileUrl

    const chatProfile = messageMember?.profile ?? directProfile;
    if(!chatProfile)
        return;

    let isAdmin, isModerator;
    if(currentMember){
        isAdmin = currentMember.role === MemberRole.ADMIN;
        isModerator = currentMember.role === MemberRole.MODERATOR;
    }
    const isOwner = messageMember ? (currentMember?.id === messageMember?.id) : (directProfile?.id === currentProfile?.id);
    const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
    const canEditMessage = !deleted && isOwner && !fileUrl;
    

    const onMemberClick = () => {
        if(isOwner){
            return;
        }
        redirectToDirect(chatProfile.id)
    }

    return (
        <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
                    {/* msg */}
            <div className="group flex gap-x-2 items-start w-full">
                <div onClick={onMemberClick} className={cn("hover:drop-shadow-md transition", !isOwner && "cursor-pointer")}>
                    <UserAvatar
                    src={chatProfile?.imageUrl!}/>
                </div>
                <div className="flex flex-col w-full">
                    {/* name of the user role icon and time stamp of the msg */}
                    <div className="flex sm:items-center sm:flex-row gap-x-2 text-nowrap flex-col">
                        <div className="flex items-center">
                            <p onClick={onMemberClick} className="font-semibold text-sm hover:underline cursor-pointer">
                                {chatProfile.name}
                            </p>
                            {messageMember && <ActionTooltip label={messageMember.role}>
                                {roleIconMap[messageMember.role]}
                            </ActionTooltip>}
                        </div>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                            {timestamp}
                        </span>
                    </div>
                    {/* image */}
                    {isImage && (
                        <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
                        >
                        <Image
                        src={fileUrl}
                        alt={content}
                        fill
                        className="object-cover"
                        />
                        </a>
                    )}
                    {/* pdf file */}
                    {isPdf && (
                        <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                            <FileIcon className="h-10 2-10 fill-indigo-200 stroke-indigo-400"/>
                            <span className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline">
                                {fileUrl}
                            </span>  
                        </a>
                    )}
                    {/* text content */}
                    {!fileUrl && !isEditing && (
                        <p className={cn("text-sm text-zinc-600 dark:text-zinc-300", deleted && "italic text-zinc-300 dark:text-zinc-400 text-xs mt-1")}>
                            {content}
                            {isUpdated && !deleted && (
                                <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                                    (edited)
                                </span>
                            )}
                        </p>
                    )}
                    {/* editing form */}
                    {!fileUrl && isEditing && (
                        <Form {...form}>
                            <form className="flex items-center w-full gap-x-2 pt-2" onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <div className="relative w-full">
                                                <Input
                                                {...field}
                                                disabled={isLoading}
                                                placeholder="Editing message"
                                                className="p-2 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"/>
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}  
                                >
                                </FormField>
                                <Button disabled={isLoading} variant="primary" size="sm">
                                    Save
                                </Button>
                            </form>
                            <span className="text-[10px] mt-1 text-zinc-400">
                                Press escape to cancel, enter to save
                            </span>
                        </Form>
                    )}
                </div>
            </div>
            {/* msg actions */}
            {canDeleteMessage && (
                <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white dark:bg-zinc-800 border rounded-sm">
                    {canEditMessage && (
                        <ActionTooltip label="Edit">
                            <Edit onClick={() => setIsEditing(true)} className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-500 dark:hover:text-zinc-300"/>
                        </ActionTooltip>
                    )}
                    {canDeleteMessage && (
                        <ActionTooltip label="Delete">
                            <Trash onClick={() => onOpen("deleteMessage", { apiUrl: `${socketUrl}/${id}`, query: socketQuery })} className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-red-500"/>
                        </ActionTooltip>
                    )}
                </div>
            )}
        </div>
    )
}

export default ChatItem;
"use client"

import { ServerWithMembersWithProfiles } from '@/types';
import { MemberRole } from '@prisma/client';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from 'lucide-react';
import { useModal } from '@/hooks/use-modal-store';

type ServerHeaderProps = {
    server: ServerWithMembersWithProfiles,
    role?: MemberRole
};


const ServerHeader = (
    {server, role}: ServerHeaderProps
) => {
    const { onOpen } = useModal()

    const isAdmin = role === MemberRole.ADMIN
    const isModerator = isAdmin || role == MemberRole.MODERATOR;

    // TODO change icon flex arrow down to X on open
    return ( 
        <DropdownMenu>
            <DropdownMenuTrigger className='focus:outline-none' asChild>
                <button className='w-full font-semibold px-3 flex 
                items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2
                hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition'>
                    {server.name}
                    
                    <ChevronDown className='h-5 w-5 ml-auto'/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
            className='w-56 text-xs font-medium text-black
            dark:text-neutral-400 space-y-[2px]'
            >
                {isModerator && (
                    <DropdownMenuItem
                    onClick={() => onOpen("invite", {inviteLink: `/invite/${server?.inviteCode}`})}
                    className='text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer'
                    >
                        Invite people
                        <UserPlus className='h-4 w-4 ml-auto'/>
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem
                    onClick={() => onOpen('editServer', {server})}
                    className='px-3 py-2 text-sm cursor-pointer'
                    >
                        Server settings
                        <Settings className='h-4 w-4 ml-auto'/>
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem
                    onClick={() => onOpen('members', {server})}
                    className='px-3 py-2 text-sm cursor-pointer'
                    >
                        Manage members
                        <Users className='h-4 w-4 ml-auto'/>
                    </DropdownMenuItem>
                )}
                {isModerator && (
                    <DropdownMenuItem
                    onClick={() => onOpen("createChannel", {server})}
                    className='px-3 py-2 text-sm cursor-pointer'
                    >
                        Create channel
                        <PlusCircle className='h-4 w-4 ml-auto'/>
                    </DropdownMenuItem>
                )}
                {isModerator && (
                    <DropdownMenuSeparator/>
                    )}
                {isAdmin && (
                        <DropdownMenuItem
                        onClick={() => onOpen("deleteServer", {server})}
                        className='text-rose-500 px-3 py-2 text-sm cursor-pointer'
                        >
                            Delete server
                            <Trash className='h-4 w-4 ml-auto'/>
                        </DropdownMenuItem>
                    )}
                {!isAdmin && (
                        <DropdownMenuItem
                        onClick={() => onOpen("leaveServer", {server})}
                        className='text-rose-500 px-3 py-2 text-sm cursor-pointer'
                        >
                            Leave server
                            <LogOut className='h-4 w-4 ml-auto'/>
                        </DropdownMenuItem>
                    )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
 
export default ServerHeader;
"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios  from "axios";

import {z} from 'zod'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { ChannelType } from "@prisma/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import qs from "query-string"
import { useEffect } from "react";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Your channel needs a name :("
    }).refine(
        name => name.toLowerCase() !== "general",
        {
            message: "Channel name canntot be \"general\""
        }
    ),
    type: z.nativeEnum(ChannelType)
})

type ServerSchema = z.infer<typeof formSchema>

const EditChannelModal = () => {

    const {isOpen, onClose, type, data} = useModal();
    const { channel, server } = data;


    const isModalOpen = isOpen && type == 'editChannel'

    const router = useRouter();

    //TODO change default type for Create channel of server sidebar, change title too
    const form = useForm<ServerSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: ChannelType.TEXT
        }
    })
    //the modal is already rendered because of the modal provider, so we have to setTheValue like this
    useEffect(() => {
        if(channel){
            form.setValue("name", channel.name)
            form.setValue("type", channel.type)
        }
    }, [form, channel])
    
    const isSubmitting = form.formState.isSubmitting

    const onSubmit = async (data: ServerSchema) => {
        try{
            const url = qs.stringifyUrl({
                url: `/api/channels/${channel?.id}`,
                query: {
                    serverId: server?.id
                }
            });
           await axios.patch(url, data);
           router.refresh();
           handleClose();
        } catch(error){
            console.log(error);
        }
    }

    const handleClose = () => {
        form.reset();
        onClose();
    }

    return ( 
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px6">

                </DialogHeader>
                <DialogTitle className="text-2xl text-center font-bold">
                    Edit Channel <span className="text-indigo-500">{channel?.name}</span>
                </DialogTitle>
                <Form {...form}>
                    <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="px-6 space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-400">
                                           Channel name
                                        </FormLabel>
                                       <FormControl>
                                        <Input {...field} 
                                        disabled={isSubmitting}
                                        autoComplete="off"
                                        className="bg-zinc-300/50 border-0
                                        focus-visible:ring-0 focus-visible:ring-offset-0"
                                        placeholder="Enter channel name"
                                        />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="type"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Channel Type
                                        </FormLabel>
                                        <Select 
                                        disabled={isSubmitting}
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger
                                                className="bg-zinc-300/50 border-0
                                                focus:ring-0 text-black ring-offset-0
                                                focus:ring-offset-0 capitalize outline-none"
                                                >
                                                    <SelectValue placeholder="Select a channel type"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.values(ChannelType).map((type) => (
                                                    <SelectItem
                                                    key={type}
                                                    value={type}
                                                    className="capitalize"
                                                    >
                                                        {type.toLowerCase()}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    <DialogFooter className="bg-gray-100 px-6 py-4">
                        <Button variant="primary" disabled={isSubmitting}>
                            Save
                        </Button>
                    </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
     );
}
 
export default EditChannelModal;
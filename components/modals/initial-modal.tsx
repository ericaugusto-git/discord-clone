"use client"

import {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogClose,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios  from "axios";

import {z} from 'zod'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import FileUpload from "../file-upload";
import { useRouter } from "next/navigation";


const formSchema = z.object({
    name: z.string().min(1, {
        message: "Your server needs a name :("
    }),
    imageUrl: z.string().min(1, "An image is required.")
})

type ServerSchema = z.infer<typeof formSchema>

const InitialModal = () => {
    const [isMounted, setIsMounted] = useState(false);

    const router = useRouter();

    useEffect(
        () => {
            setIsMounted(true)
        }, []
    )

    const form = useForm<ServerSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: ""
        }
    })


    const isSubmitting = form.formState.isSubmitting

    const onSubmit = async (data: ServerSchema) => {
        try{
           await axios.post('/api/servers', data);
           form.reset();
           router.refresh();
           window.location.reload();
        } catch(error){
            console.log(error);
        }
    }

    if(!isMounted)
        return;
    return ( 
        <Dialog open>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px6">

                </DialogHeader>
                <DialogTitle className="text-2xl text-center font-bold">
                    Customize your server
                </DialogTitle>
                <DialogDescription className="text-center text-zinc-500">
                    Give your server a personality with a name and an
                    image. You can always change it later.
                </DialogDescription>
                
                <Form {...form}>
                    <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="px-6 space-y-8">
                            <div className="flex items-center justify-center text-center">
                            <FormField 
                                control={form.control}
                                name="imageUrl"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl >
                                            <FileUpload
                                            endpoint="serverImage"
                                            value={field.value}
                                            onChange={field.onChange}
                                            ></FileUpload>
                                        </FormControl>
                                    </FormItem>
                                )}                                          
                            />
                            </div>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-400">
                                            Server name
                                        </FormLabel>
                                       <FormControl>
                                        <Input {...field} 
                                        disabled={isSubmitting}
                                        className="bg-zinc-300/50 border-0
                                        focus-visible:ring-0 focus-visible:ring-offset-0"
                                        placeholder="Enter server name"
                                        />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    <DialogFooter className="bg-gray-100 px-6 py-4">
                        <Button variant="primary" disabled={isSubmitting}>
                            Create
                        </Button>
                    </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
     );
}
 
export default InitialModal;
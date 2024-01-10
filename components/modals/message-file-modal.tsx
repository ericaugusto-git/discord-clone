"use client"

import {
    Dialog,
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
import { Button } from "@/components/ui/button";
import FileUpload from "../file-upload";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import qs from "query-string";


const formSchema = z.object({
    fileUrl: z.string().min(1, "Attachment is required.")
})

type ServerSchema = z.infer<typeof formSchema>

const MessageFileModal = () => {
    const {isOpen, onClose, type, data} = useModal();
    const {apiUrl, query } =data;

    const isModalOpen = isOpen && type === "messageFile";


    const router = useRouter();

    const form = useForm<ServerSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fileUrl: ""
        }
    })

    const handleClose = () => {
        onClose();
        form.reset();
    }

    const isSubmitting = form.formState.isSubmitting

    const onSubmit = async (values: ServerSchema) => {
        try{
            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query
            });
           await axios.post(url , {...values, content: values.fileUrl});
           form.reset();
           router.refresh();
           handleClose();
        } catch(error){
            console.log(error);
        }
    }

    return ( 
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px6">

                </DialogHeader>
                <DialogTitle className="text-2xl text-center font-bold">
                    Add an attachment
                </DialogTitle>
                <DialogDescription className="text-center text-zinc-500">
                    Send a file as a message
                </DialogDescription>
                
                <Form {...form}>
                    <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="px-6 space-y-8">
                            <div className="flex items-center justify-center text-center">
                            <FormField 
                                control={form.control}
                                name="fileUrl"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl >
                                            <FileUpload
                                            endpoint="messageFile"
                                            value={field.value}
                                            onChange={field.onChange}
                                            ></FileUpload>
                                        </FormControl>
                                    </FormItem>
                                )}                                          
                            />
                            </div>
                        </div>
                    <DialogFooter className="bg-gray-100 px-6 py-4">
                        <Button variant="primary" disabled={isSubmitting}>
                             Send
                        </Button>
                    </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
     );
}
 
export default MessageFileModal;
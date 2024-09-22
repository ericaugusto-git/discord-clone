"use client"

import { Record } from "@prisma/client/runtime/library";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Plus, SendIcon, Smile } from "lucide-react";
import { Input } from "../ui/input";
import axios from "axios";
import qs from "query-string";
import { useModal } from "@/hooks/use-modal-store";
import EmojiPicker from "../emoji-picker";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";


interface ChatInputProps {
    apiUrl: string;
    query: Record<string,any>;
    name: string;
    type: "direct" | "channel"
}

const formSchema = z.object({
    content: z.string().min(1)
})

type FormSchemaType = z.infer<typeof formSchema>

const ChatInput = (
    {apiUrl, query, name, type}: ChatInputProps
) => {
    const {onOpen} = useModal();
    const router = useRouter();
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubimit = async (value: FormSchemaType) => {
        try{
            const url = qs.stringifyUrl({
                url: apiUrl,
                query: query
            })
            
            await axios.post(url, value);
            //TODO scroll to bottom
            form.reset();
            router.refresh();
        }catch(error){

        }
        
    }

    return ( 
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubimit)}>
                <FormField
                control={form.control}
                name="content"
                render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <div className="relative p-4 pb-6">
                                <button onClick={() => onOpen("messageFile", {apiUrl, query})} type="button"  className="mask-center-cover absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center" style={{maskImage: 'url("/icons/upload.svg")'}}>
                                </button>
                                <Input {...field} disabled={isLoading} autoComplete="off" placeholder={`Message ${type === "direct" ? name : "#" + name}`} className="px-14 py-6 rounded-[15px] bg-zinc-100 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"/>
                                <div className="absolute top-5 right-5 flex items-center gap-3">
                                    <EmojiPicker
                                    onChange={(emoji:string) => field.onChange(`${field.value}${emoji}`)}
                                    />
                                    <button type="submit" disabled={isLoading} className={cn("bg-[#8ADAFC] p-2 ali rounded-[11px] hover:bg-[hsl(198,94%,82%)]", isLoading && "opacity-50")}>
                                        <div className="mask-center-cover size-6 bg-white" style={{maskImage: `url("/icons/send.svg")`}}></div>
                                    </button>
                                </div>
                            </div>
                        </FormControl>
                    </FormItem>
                )}
                />
            </form>
        </Form>
     );
}
 
export default ChatInput;
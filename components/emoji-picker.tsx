"use client"

import { Smile } from "lucide-react";
import { Popover } from "./ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"
import { useTheme } from "next-themes";

interface EmojiPickerProps {
    onChange: (value: string) => void
}
const EmojiPicker = ({onChange}: EmojiPickerProps) => {
    const {resolvedTheme} = useTheme();

    return ( 
        <Popover>
            <PopoverTrigger>
            {/* <Smile className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition"/> */}
            <div className="mask-center-cover size-6 bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300" style={{maskImage: `url("/icons/emoji.svg")`}}></div>
            </PopoverTrigger>
            <PopoverContent side="right" sideOffset={-40} className="bg-transparent border-none shadow-none drop-shadow-none mb-20">
                <Picker 
                theme={resolvedTheme}
                data={data}
                onEmojiSelect={(emoji: any) => onChange(emoji.native)}
                />
            </PopoverContent>
        </Popover>
     );
}
 
export default EmojiPicker;

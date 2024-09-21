"use client"

import { useSocket } from "@/components/providers/socket-provider";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

export const SocketIndicator = () => {
    const { isConnected } = useSocket();
    const label = isConnected ? "Live: Real-time updates" : "Fallback: Polling every 1s";
    const abbr = isConnected ? "Live" : "Fallback"; 

        return ( 
        <Badge variant="outline" className={cn("bg-emerald-600 px-0 size-5 animate-pulse xsm:animate-none xsm:size-fit xsm:px-2.5 text-white border-none", !isConnected && "bg-yellow-600")}>
            <div className="hidden xsm:block">
                <span className="hidden sm:block">

                {label}                
                </span>
                <span className="sm:hidden">

                {abbr}
                </span>
            </div>
        </Badge> 
        );
}
 
export default SocketIndicator;
"use client"

import { useSocket } from "@/components/providers/socket-provider";
import { Badge } from "./ui/badge";

export const SocketIndicator = () => {
    const { isConnected } = useSocket();

    if(!isConnected){
        return ( 
        <Badge variant="outline" className="bg-yellow-600 text-white border-none">
                        <span className="hidden sm:visible">

                        Fallback: Polling every 1s
                        </span>
            <span className="sm:hidden">

            Polling
            </span>
        </Badge> 
        );
    }

    if(isConnected){
        return ( 
        <Badge variant="outline" className="bg-emerald-600 px-0 size-5 animate-pulse xsm:animate-none xsm:size-fit xsm:px-2.5 text-white border-none">
            <div className="hidden xsm:block">
                <span className="hidden sm:block">

                Live: Real-time updates
                </span>
                <span className="sm:hidden">

                Live
                </span>
            </div>
        </Badge> 
        );
    }
}
 
export default SocketIndicator;
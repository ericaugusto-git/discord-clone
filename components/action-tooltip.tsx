"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type TooltipProps = {
  label: string,
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end",
  children: React.ReactNode
}

const ActionTooltip = (
  {
    label,
    side,
    align,
    children
  }: TooltipProps
) => {
    return ( 
        <TooltipProvider delayDuration={50}>
        <Tooltip>
          <TooltipTrigger asChild>
            {children}
          </TooltipTrigger>
          <TooltipContent side={side} align={align}>
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
     );
}
 
export default ActionTooltip;
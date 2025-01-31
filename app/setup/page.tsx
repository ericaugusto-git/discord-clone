import { useSocket } from "@/components/providers/socket-provider";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

export default async function Setup(){
    const profile = await initialProfile();
    return redirect('/directs')
}
import { useSocket } from "@/components/providers/socket-provider";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

export default async function Setup(){
    console.log('setup')
    const profile = await initialProfile();
    return redirect('/directs')
}
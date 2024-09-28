import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

export default async function Setup(){
    await initialProfile();
    return redirect('/directs')
}
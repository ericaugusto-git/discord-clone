import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

export default async function Setup(){
    const profile = await initialProfile();
    console.log("setup")
    console.log(profile)
    return redirect('/directs')
}
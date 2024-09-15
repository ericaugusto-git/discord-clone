'use server'
import { redirect } from "next/navigation";

// bars 🔥
export async function redirectToDirect(profileId: string) {
    
    redirect(`/directs/direct/${profileId}`);
}

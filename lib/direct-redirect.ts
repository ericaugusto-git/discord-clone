'use client'

import { useRouter } from "next/navigation";

// bars 🔥
export async function redirectToDirect(profileId: string) {
    const router = useRouter();
    // router.push(`/directs/direct/${profile.id}`)
    router.push(`/directs/direct/${profileId}`);
}

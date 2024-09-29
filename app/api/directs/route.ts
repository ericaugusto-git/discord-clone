import { currentProfile } from "@/lib/current-profile";
import { getDirects } from "@/lib/direct";
import { NextResponse } from "next/server";

export async function GET(req: Request){
    try{
        const profile = await currentProfile();
        if(!profile){
            throw new NextResponse("Unauthorized", {status: 401});
        }
        const directs = await getDirects(profile.id);
        if(!directs)
            return NextResponse.json([]);
        return NextResponse.json(directs);
    } catch(error){
        console.log("[FROM_DIRECTS_GET]",error);
        return new NextResponse("Internal Error", {status: 500});
    }
}
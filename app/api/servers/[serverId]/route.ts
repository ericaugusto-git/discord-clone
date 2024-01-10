import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, {params} : {params: {serverId:string}}) {
    try{
        const profile = await currentProfile();
        if(!profile){
            throw new NextResponse("Unauthorized", {status: 401});
        }
        const {name, imageUrl} = await req.json();
        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: profile.id
            },
            data: {
                name: name,
                imageUrl: imageUrl
            }
        })
        return NextResponse.json(server);
    }catch(error){
        console.log("[FROM_SERVER_ID_PATCH]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}

export async function DELETE(req: Request, {params}: {params: {serverId: string}} ) {
    try{
        const profile = await currentProfile();
        if(!profile){
            throw new NextResponse("Unauthorized", {status: 401});
        }

        const server = await db.server.delete({
            where: {
                profileId: profile.id,
                id: params.serverId
            }
        })

        return NextResponse.json(server);
    }catch(error){
        console.log("[FROM_SERVER_ID_DELETE]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}
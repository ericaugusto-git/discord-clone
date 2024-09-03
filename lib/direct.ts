import { Direct, Profile } from "@prisma/client";
import { db } from "./db"

export type DirectWithProfile = Direct & {profileOne: Profile, profileTwo: Profile};


export const getDirects = async (profileId: string): Promise<DirectWithProfile[] | null> => {
    try{
        return await db.direct.findMany({
            where: {
                OR: [
                    {profileOneId: profileId},
                    {profileTwoId: profileId},
                ]
            },
            include: {
                profileOne: true,
                profileTwo: true
            }
        })
    }catch(error){
        console.log(error);
        return null;
    }
}

export const getOrCreateDirect = async (profileOneId:string, profileTwoId: string) => {
    if(profileOneId === profileTwoId){
        return null;
    }
        let direct = await findDirect(profileOneId, profileTwoId) || await findDirect(profileTwoId, profileOneId);
        if(!direct)
            direct = await createNewDirect(profileOneId, profileTwoId);
        return direct;
    }

const findDirect = async (
    profileOneId:string, profileTwoId: string
)=> {
    try{
        return await db.direct.findFirst({
            where: {
                AND: [
                    {profileOneId: profileOneId},
                    {profileTwoId: profileTwoId}
                ]
            },
            include: {
                profileOne: true,
                profileTwo: true
            }
        });
    }catch(error){
        return null;
    }
}

const createNewDirect = async (
    profileOneId:string, profileTwoId: string
    ) => {
    try{
        return await db.direct.create({
            data: {
                profileOneId,
                profileTwoId
            },
            include: {
                profileOne: true,
                profileTwo: true
            }
        })
    }catch(error){
        return null;
    }
}
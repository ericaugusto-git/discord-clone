// pages/api/getUserProfile.ts
import { currentProfile } from '@/lib/current-profile';
import { NextResponse } from 'next/server';


export async function GET(req: Request) {
    try {
    const profile = await currentProfile();
    return NextResponse.json(profile);
    } catch (error) {
      return new NextResponse("Failed to fetch user profile", {status: 500});
    }
}

import bcrypt from "bcrypt"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { username, password, name } = body

    if (!username || !password) {
      return new NextResponse("Missing username or password", { status: 400 })
    }

    const existingProfile = await db.profile.findUnique({
      where: {
        username: username
      }
    })

    if (existingProfile) {
      return new NextResponse("Username already exists", { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const profile = await db.profile.create({
      data: {
        username,
        hashedPassword,
      }
    })

    return NextResponse.json(profile)
  } catch (error) {
    console.log("[REGISTRATION_ERROR]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
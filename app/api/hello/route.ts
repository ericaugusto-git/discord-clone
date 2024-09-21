import { NextRequest, NextResponse } from "next/server";

export async function  GET(){
    return NextResponse.json(
        { msg: 'hello!' },
        { status: 200 }
      );
}
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function GET(req: NextRequest){
    try {
        const userID = await getDataFromToken(req)
        const user = await User.findById(userID).select("-password")
        
        return NextResponse.json({
            message: "User found",
            data: user
        })

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
        
    }
}
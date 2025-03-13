import authSeller from "@/lib/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectDb from "@/config/db";

export async function GET(request) {
    try {
        const { userId } = getAuth(request)

        const isSeller = authSeller(userId)

        if(!isSeller) {
            return NextResponse.json({success: false, message: 'Not Authorized'})
        } 

        await connectDb()

        const products = await Product.find({})
        return NextResponse.json({success: true, products})

    } catch (error) {
        return NextResponse.json({success: false, message: error.message})
    }
}
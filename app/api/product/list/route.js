import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectDb from "@/config/db";

export async function GET(request) {
    try {

        await connectDb()

        const products = await Product.find({})
        return NextResponse.json({success: true, products})

    } catch (error) {
        return NextResponse.json({success: false, message: error.message})
    }
}
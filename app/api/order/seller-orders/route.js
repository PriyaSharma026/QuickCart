import connectDb from "@/config/db";
import authSeller from "@/lib/authSeller";
import Address from "@/models/Address";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Order from "@/models/Order";
import Product from "@/models/Product";


export async function GET(request) {
    try {
        
        const { userId } = getAuth(request)

        const isSeller = await authSeller(userId)

        if (!isSeller) {
            return NextResponse.json({ success: false, message: 'not authorized'})
        }

        await connectDb()

        Address.length
        Product.length

        const orders = await Order.find({}).populate('address items.product')

        return NextResponse.json({ success: true, orders })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: error.message });

    }
}
import { connectDB } from "@/app/config/dbConfig";
import { NextResponse } from "next/server";
import { tshirtBuy } from "@/app/models/tshirtBuy";

connectDB();

export async function POST(request) {
	const { name, email, phoneNumber, imageUrl, size } = await request.json();

	try {
		const newBuy = new tshirtBuy({
			name,
			email,
			phoneNumber,
			size,
			imageUrl: imageUrl,
		});

		const res = await newBuy.save();

		return NextResponse.json({
			message: "Purchase Done.",
			data: res,
		});
	} catch (error) {
		console.error("Error To Purchase.", error);
		return NextResponse.json(error);
	}
}

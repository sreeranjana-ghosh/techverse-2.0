import { connectDB } from "@/app/config/dbConfig";
import { NextResponse } from "next/server";
import { tshirtBuy } from "@/app/models/tshirtBuy";

connectDB();

export async function GET(request,{ params }) {
	const id = params.id;
	try {
		const res = await tshirtBuy.findById(id);
		return NextResponse.json({
			message: "Data Fetched.",
			data: res,
		});
	} catch (error) {
		console.error("Error fetching user data.", error);
		return NextResponse.json(error);
	}
}

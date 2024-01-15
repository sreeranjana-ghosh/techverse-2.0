import { connectDB } from "@/app/config/dbConfig";
import { NextResponse } from "next/server";
import { CombineEventsRegistration } from "@/app/models/combineEvents";

connectDB();

export async function GET(request,{ params }) {
	const id = params.id;
	try {
		const res = await CombineEventsRegistration.findById(id);
		return NextResponse.json({
			message: "Data Fetched.",
			data: res,
		});
	} catch (error) {
		console.error("Error fetching user data.", error);
		return NextResponse.json(error);
	}
}

import { connectDB } from "@/app/config/dbConfig";
import { NextResponse } from "next/server";
import { CombineEventsRegistration } from "@/app/models/combineEvents";

connectDB();

export async function POST(request) {
	const { name, email, phone, eventName, teamName, imageUrl, participants } =
		await request.json();

	try {
		const newRegistration = new CombineEventsRegistration({
			name,
			email,
			phone,
			teamName,
			eventName,
			imageUrl: imageUrl,
			participants,
		});

		const res = await newRegistration.save();
		return NextResponse.json({
			message: "Registration Done.",
			data: res,
		});
	} catch (error) {
		console.error("Error To Registration.", error);
		return NextResponse.json(error);
	}
}

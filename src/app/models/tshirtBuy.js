import mongoose from "mongoose";

const tshirtBuySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: Number,
		required: true,
	},
	size:{
		type: String,
		required: true,
	},
    date: {
		type: Date,
		default: Date.now(),
	},
	imageUrl: {
		type: String,
		required: true,
	},
});

export const tshirtBuy =
	mongoose.models.tshirtBuy || mongoose.model("tshirts", tshirtBuySchema);

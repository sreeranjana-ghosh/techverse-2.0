import mongoose from "mongoose";

const combineEventSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: Number,
		required: true,
	},
	teamName: {
		type: String,
	},
	eventName: {
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
	participants: [
		{
			name: {
				type: String,
			},
			email: {
				type: String,
			},
		},
	],
});

export const CombineEventsRegistration =
	mongoose.models.combineEvents ||
	mongoose.model("combineEvents", combineEventSchema);

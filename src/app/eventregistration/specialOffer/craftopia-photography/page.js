"use client";
import React, { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import "../styles.css";

const Page = () => {
	const router = useRouter();
	const [file, setFile] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		teamName: "",
		imageUrl: "",
		eventName: "CRAFTOPIA + FREEZE THE FRAME",
		participants: [],
	});

	const addParticipant = () => {
		setFormData({
			...formData,
			participants: [...formData.participants, { name: "", email: "" }],
		});
	};

	const removeParticipant = (index) => {
		const updatedParticipants = [...formData.participants];
		updatedParticipants.splice(index, 1);

		setFormData({
			...formData,
			participants: updatedParticipants,
		});
	};

	const handleForm = async (event) => {
		event.preventDefault();
		try {
			setIsLoading(true);

			// For Image Upload..
			const inputFileData = new FormData();
			inputFileData.append("file", file);
			inputFileData.append("upload_preset", "techimage");
			const data = await axios.post(
				"https://api.cloudinary.com/v1_1/techverse/image/upload",
				inputFileData
			);
			const imageUrl = data.data.secure_url;

			// Send The Data in Backend..
			const res = await axios.post("/api/combineEvents", {
				...formData,
				imageUrl: imageUrl,
			});

			// Check The Backend Response...
			if (res.data.message === "Registration Done.") {
				setIsLoading(false);
				toast.success("Registration Done", {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				});

				const id = res.data.data._id;
				router.push(`/eventregistration/specialOffer/specialTicket/${id}`);
			} else {
				throw new Error("Backend registration failed");
			}
		} catch (error) {
			setIsLoading(false);
			toast.error("Error registering.", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});

			console.error("Error", error);
		}
	};

	return (
		<div className="h-screen w-screen md:h-auto md:flex flex-col gap-1 justify-center items-center p-3 mt-24 md:p-0 md:mt-24">
			<div className="flex items-center justify-center font-roboto">
				<div className="form-container p-8 rounded-lg shadow-md w-auto">
					<h1 className="text-2xl md:text-2xl font-semibold text-center mb-4 text-white">
						CRAFTOPIA + FREEZE THE FRAME
					</h1>
					<form onSubmit={handleForm}>
						<div className="form-container p-4 rounded-lg mb-4 mt-4">
							<div className="flex justify-between gap-2">
								<div className="mb-4">
									<label className="form-label block">
										Name:
									</label>
									<input
										onChange={(event) => {
											setFormData({
												...formData,
												name: event.target.value,
											});
										}}
										value={formData.name}
										type="text"
										required={true}
										className="form-input w-full rounded p-2"
									/>
								</div>
								<div className="mb-4">
									<label className="form-label block">
										Phone Number:
									</label>
									<input
										onChange={(event) => {
											setFormData({
												...formData,
												phone: event.target.value,
											});
										}}
										value={formData.phone}
										type="tel" // Change 'phone' to 'tel'
										required={true}
										className="form-input w-full rounded p-2"
									/>
								</div>
							</div>
							<div className="mb-4">
								<label className="form-label block">
									Email:
								</label>
								<input
									onChange={(event) => {
										setFormData({
											...formData,
											email: event.target.value,
										});
									}}
									value={formData.email}
									type="email"
									required={true}
									className="form-input w-full rounded p-2"
								/>
							</div>
						</div>
						<h1 className="text-red-600">
							* CRAFTOPIA + FREEZE THE FRAME = 80/-
						</h1>
						<div className="mb-4 mt-4">
							<Image
								src="/qr_code.jpeg"
								width={200}
								height={200}
								alt="qrcode"
							/>
							<h1 className="text-white">
								UPI ID:{" "}
								<span className="text-orange-400">
									8170842884@paytm
								</span>
							</h1>
						</div>
						<div className="mb-4">
							<label className="form-label block">
								Payment Photo:
							</label>
							<input
								onChange={(event) => {
									setFile(event.target.files[0]);
								}}
								accept="image/*"
								type="file"
								name="file"
								required={true}
								className="form-input w-full rounded p-2"
							/>
						</div>
						<button
							type="submit"
							className="button w-full font-bold rounded py-2"
						>
							{isLoading ? "Submitting..." : "Submit"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Page;

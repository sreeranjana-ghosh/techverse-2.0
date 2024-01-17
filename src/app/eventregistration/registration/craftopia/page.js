"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Contact from "../../eventDetails/Contact";
import "../styles.css";

const Page = () => {
	const router = useRouter();
	const [file, setFile] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		imageUrl: "",
		eventName: "Craftopia",
	});

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
			const imageUrl = await data.data.secure_url;
			// Send The Data in Backend..
			const res = await axios.post("/api/registration", {
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
				router.push(`/eventregistration/eventticket/${id}`);
			} else {
				throw new Error("Backend registration failed");
			}
		} catch (error) {
			setIsLoading(false);
			toast.error("Error to Register.", {
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

	const contactDetails = {
		details:
			"The Grand Handcraft Competition Celebrating Artistry, Imagination, and Skill - Unleash Your Creativity and Showcase Your Handmade Masterpieces!",
		headName: "BARNA BARMAN",
		headPhoneNo: "6290423335",
		headEmailId: "barnabarman06@gmail.com",
		coHeadName: "LEESHA SAHA",
		coHeadPhoneNo: "8100211820",
		coHeadEmailId: "leeshasaha13@gmail.com",
	};

	const rules = [
		"1.It si a live contest (mode-offline). Participants wil compete in person, at the campus. Participants should submit their hand craft & Painting two days before the event physically.",
		"2.Each participant can submit maximum of two works. Participants must elaborate on their work in front of the judges (3 minutes will be given to each participant to describe). There will be a question-answering session too.",
		"3.Your work must be your original concept and not a copy of anyone else and it should not be the work which you have already presented in the previous year.",
		"4.Two winners will be selected, one from handcrafts and another from paintings."
	];

	return (
		<div className="h-screen w-screen md:flex gap-20 md:justify-center md:items-center md:mt-24">
			<Contact
				params={contactDetails}
				rules={rules}
				imgUrl={"/EventPageImg/craftopia.jpg"}
			/>
			<div className="flex items-center justify-center text-black font-roboto">
				<div className="form-container p-8 rounded-xl shadow-md w-[30rem]">
					<h1 className="text-3xl font-semibold text-center mb-4 text-white">
						Craftopia
					</h1>
					<form onSubmit={handleForm}>
						<div className="mb-4">
							<label className="form-label block">Email:</label>
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
								className="form-input w-full rounded-xl p-2"
							/>
						</div>
						<div className="flex gap-2">
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
									className="form-input w-full rounded-xl p-2"
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
									type="phone"
									required={true}
									className="form-input w-full rounded-xl p-2"
								/>
							</div>
						</div>
						<h1 className="text-red-600">
							* CRAFTOPIA: 50/- (Per head)
						</h1>
						<div className="mb-4 mt-4">
							<Image
								src="/qr_code.jpeg"
								width={200}
								height={200}
								alt="qrcode"
								loading="lazy"
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
								Payment Photo
							</label>
							<input
								onChange={(event) => {
									setFile(event.target.files[0]);
								}}
								accept="image/*"
								type="file"
								name="file"
								required={true}
								className="form-input w-full rounded-xl p-2"
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

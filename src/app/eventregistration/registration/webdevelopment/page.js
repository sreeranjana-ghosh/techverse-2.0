"use client";
import React, { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
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
		eventName: "Web Development",
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
			"Showcase your creative talent of website development. Explore your ability to build excellent websites and impress everyone with your developing skills.",
		headName: "JYOTIRMOY MONDAL",
		headPhoneNo: "8167722654",
		headEmailId: "jyotiff59@gmail.com",
		coHeadName: "SANKU DAS BAIRAGYA",
		coHeadPhoneNo: "8637066244",
		coHeadEmailId: "sankudasbairagya.77@gmail.com",
	};

	const rules = [
		"There will be two rounds: The first one is the knockout round. In the knockout round, it will be a MCQ test roun comprising of questions from markup languages like html, css, web designing basics from javascript (vanilla and popular frameworks like angular), some server side popular languages like PHP, NodejS and database basics questions SOL/NoSOL.All the teams qualifying for the final round will have to design a web-application as specified on spot.",
		{
			title: "(1st round):",
			description:
				"Teams can have a maximum of 2 members. Inter-college teams as well as single participants can also apply. Al the members of the team should be students studying in a College/School and should carry their institutional id cards.Registration will be done on the website and on the registration desk before the event.",
		},
		{
			title: "(2nd round):",
			description:
				" Internet connection will be provided to the teams.In case of any dependency requirements (like composer,npm, etc.), teams should inform the volunteers immediately.Teams will not be allowed to take code from any existing repository in any version control system.Teams aren't allowed to use ready-made templates. Teams have to create the entire website framework themselves.The websites should not contain any material deemed objectionable by the judges (e.g. no pornography, no profanity, nothing offensive to a person's gender, ethnicity, or religious beliefs, no references to alcohol, tobacco, or drugs).Any copyright violation si the sole responsibility of the team and not the organizers Teams can use open source libraries, frameworks.",
		},
	];

	return (
		<div className="h-screen w-screen md:h-auto md:flex gap-20 justify-center items-center md:mt-24">
			<Contact
				params={contactDetails}
				rules={rules}
				imgUrl={"/EventPageImg/web development.jpeg"}
			/>
			{/* <div className="flex items-center justify-center font-roboto">
				<div className="form-container p-8 rounded shadow-md w-[30rem]">
					<h1 className="text-3xl font-semibold text-center mb-4 text-white">
						Web Development
					</h1>
					<form onSubmit={handleForm}>
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
									type="phone"
									required={true}
									className="form-input w-full rounded p-2"
								/>
							</div>
						</div>
						{formData.participants.map((participant, index) => (
							<div key={index}>
								<div className="flex gap-1">
									<input
										type="text"
										placeholder={`Participant ${
											index + 1
										} Name`}
										value={participant.name}
										onChange={(e) =>
											setFormData({
												...formData,
												participants:
													formData.participants.map(
														(p, i) =>
															i === index
																? {
																		...p,
																		name: e
																			.target
																			.value,
																  }
																: p
													),
											})
										}
										className="form-input w-full rounded p-2"
									/>
									<input
										type="email"
										placeholder={`Participant ${
											index + 1
										} Email`}
										value={participant.email}
										onChange={(e) =>
											setFormData({
												...formData,
												participants:
													formData.participants.map(
														(p, i) =>
															i === index
																? {
																		...p,
																		email: e
																			.target
																			.value,
																  }
																: p
													),
											})
										}
										className="form-input w-full rounded p-2"
									/>
								</div>
								<button
									type="button"
									onClick={() => removeParticipant(index)}
									className="button-red mt-2 mb-5 w-60 rounded py-2"
								>
									Remove
								</button>
							</div>
						))}
						{formData.participants.length < 1 && (
							<button
								type="button"
								onClick={addParticipant}
								className="button-green mb-10 w-60 rounded py-2"
							>
								Add Participant
							</button>
						)}
						<h1 className="text-red-600">
							* WEB DEVELOPMENT: 50/-(Per head)
						</h1>
						<div className="mb-4 mt-4">
							<Image
								src="/qr_code.jpeg"
								width={200}
								height={200}
								alt="qrcode"
								loading="lazy"
							/>
							<h1>
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
			</div> */}
		</div>
	);
};

export default Page;

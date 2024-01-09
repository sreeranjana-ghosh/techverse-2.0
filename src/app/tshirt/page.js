"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "../tshirt/style.css";

const Page = () => {
	const router = useRouter();
	const [file, setFile] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phoneNumber: "",
		imageUrl: "",
		size: "",
	});

	const handleForm = async (event) => {
		event.preventDefault();
		try {
			setIsLoading(true);
			// For Image Upload...
			const inputFileData = new FormData();
			inputFileData.append("file", file);
			inputFileData.append("upload_preset", "techimage");
			const data = await axios.post(
				"https://api.cloudinary.com/v1_1/techverse/image/upload",
				inputFileData
			);
			const imageUrl = data.data.secure_url;

			// Send The Data to Backend...
			const res = await axios.post("/api/buy", {
				...formData,
				imageUrl: imageUrl,
			});

			// Check The Backend Response...
			if (res.data.message === "Purchase Done.") {
				setIsLoading(false);
				toast.success("Purchase Successful! 🎉", {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				});
				// const id = res.data.data._id;
				// router.push(`/purchase-slip/${id}`);
			} else {
				throw new Error("Backend data save failed.");
			}
		} catch (error) {
			setIsLoading(false);
			toast.error("Error during purchase. Please try again.", {
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
		<div className="relative h-screen w-screen md:flex gap-20 justify-center items-center md:mt-24 mb-[120vh] md:mb-0">
			<div className="flex items-center justify-center font-roboto">
				<div className="form-container p-8 rounded shadow-md w-[30rem]">
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
								className="form-input w-full p-2"
							/>
						</div>
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
									className="form-input w-full p-2"
								/>
							</div>
							<div className="mb-4">
								<label className="form-label block">
									Phone:
								</label>
								<input
									onChange={(event) => {
										setFormData({
											...formData,
											phoneNumber: event.target.value,
										});
									}}
									value={formData.phoneNumber}
									type="number"
									required={true}
									className="form-input w-full p-2"
								/>
							</div>
						</div>
						<div className="mb-4">
							<label className="form-label block">
								T-shirt Size:
							</label>
							<select
								value={formData.size}
								onChange={(event) => {
									setFormData({
										...formData,
										size: event.target.value,
									});
								}}
								className="form-input w-full p-3"
								required
							>
								<option value="" disabled>
									Select size
								</option>
								<option value="small">Small (S)</option>
								<option value="medium">Medium (M)</option>
								<option value="large">Large (L)</option>
							</select>
						</div>
						<div className="mb-4 mt-4">
							<Image
								className="form-container"
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
							{isLoading ? "Loading..." : "Buy"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Page;

"use client";
import React, { useRef, useEffect, useState } from "react";
import html2canvas from "html2canvas";
import axios from "axios";

const EventTicket = ({ params }) => {
	const [data, setData] = useState();
	const cardRef = useRef();
	useEffect(() => {
		const id = params.id;

		async function getData() {
			try {
				const response = await axios.get(`/api/specialEventData/${id}`);
				const userData = await response.data.data;
				if (userData.date) {
					userData.date = new Date(userData.date);
				}
				setData(userData);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		}
		getData();
	}, [params.id]);

	const downloadImage = () => {
		if (cardRef.current) {
			html2canvas(cardRef.current, { scale: 20 }).then((canvas) => {
				const link = document.createElement("a");
				link.href = canvas.toDataURL("image/jpeg");
				link.download = "event_ticket.jpeg";
				link.click();
			});
		}
	};

	return (
		<div className="h-auto w-screen flex justify-center items-center mt-28 md:mt-32 overflow-hidden mb-10 md:mb-0">
			<div className="w-fit h-fit">
				<div
					ref={cardRef}
					className="w-[700px] h-[250px] bg-gradient-to-r from-[#462523] from-0% via-[#cb9b51] via-22% via-[#f6e27a] via-45% via-[#f6f2c0] via-50% via-[#f6e27a] via-55% via-[#cb9b51] via-78% to-[#462523] to-150% rounded-2xl overflow-hidden shadow-md flex"
				>
					<div className="w-20 h-[100%]  bg-black text-white">
						<h1 className="w-max text-2xl font-extrabold -rotate-90 -ml-[3.8rem] mt-28 font-young">
							TECHVERSE 2.0
						</h1>
					</div>
					<div className="p-4 w-[98%]">
						<div className="mb-4 flex justify-between gap-5 items-center">
							<h1 className="text-2xl font-bold font-roboto text-black">
								{data?.eventName}
							</h1>
							<p className="text-sm text-black text-right">
								<span className="font-semibold">
									ID: {data?._id}
								</span>
							</p>
						</div>
						<div className="mb-4 mt-4">
							<p className="text-sm text-black mb-2">
								<span className="font-semibold">
									Name: {data?.name}
								</span>
							</p>
							<p className="text-sm text-black mb-2">
								<span className="font-semibold">
									Email: {data?.email}
								</span>
							</p>
							<p className="text-sm text-black mb-2">
								<span className="font-semibold">
									Phone No: {data?.phone}
								</span>
							</p>
						</div>
						<div className="text-sm text-black">
							<span>
								Date: {data?.date?.toLocaleDateString()}
							</span>
						</div>
					</div>
				</div>
				<div className="p-4 text-center mt-10">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						onClick={downloadImage}
					>
						Download Ticket
					</button>
				</div>
			</div>
		</div>
	);
};

export default EventTicket;

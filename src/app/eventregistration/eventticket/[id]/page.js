"use client";
import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import html2canvas from "html2canvas";
import axios from "axios";
import GroupLinks from "../../data/GroupLinks.json";

const EventTicket = ({ params }) => {
	const [data, setData] = useState();
	const [groupLink, setGroupLink] = useState("");
	const cardRef = useRef();
	useEffect(() => {
		const id = params.id;

		async function getData() {
			try {
				const response = await axios.get(`/api/getdata/${id}`);
				const userData = await response.data.data;
				if (userData.date) {
					userData.date = new Date(userData.date);
				}
				setData(userData);

				const selectedEvent = GroupLinks.groupLinks.find(
					(event) => event.eventName === userData.eventName
				);
				if (selectedEvent) {
					setGroupLink(selectedEvent.link);
				}
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
					className="w-[700px] h-[250px] bg-[#E0F4FF] rounded-2xl overflow-hidden shadow-md flex"
				>
					<div className="w-20 h-[100%]  bg-black text-white">
						<h1 className="w-max text-2xl font-extrabold -rotate-90 -ml-[3.8rem] mt-28 font-young">
							TECHVERSE 2.0
						</h1>
					</div>
					<div className="p-4 w-[98%]">
						<div className="mb-4 mt-2 flex justify-between gap-5 items-center">
							<h1 className="text-3xl font-bold font-roboto text-[#272829]">
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
				<div className="w-screen md:w-auto h-auto flex justify-center items-center p-4 overflow-hidden ml-40 md:ml-0">
					<div className="h-auto md:h-[250px] md:ml-0 bg-[#E0F4FF] p-8 rounded-2xl shadow-md w-[90%] md:w-full">
						<h1 className="text-3xl font-semibold mb-4">
							Join Our Group
						</h1>
						<p className="text-gray-600 mb-4">
							You are invited to join our group. Click the button
							below to join the group.
						</p>
						<Link
							href={groupLink}
							className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600"
						>
							Join Now
						</Link>
						<p className="mt-2 text-sm text-red-600">
							Note: Make sure to join using the provided link
							before the event starts.
						</p>
						<div className="mt-2 text-center">
							<Link href="/events">
								<p className="text-blue-500 hover:underline">
									Register More
								</p>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventTicket;

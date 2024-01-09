// EventTicket.js
"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const EventTicket = () => {
	const router = useRouter();
	const { id } = router.query;
	const [ticketDetails, setTicketDetails] = useState(null);

	useEffect(() => {
		const fetchTicketDetails = async () => {
			try {
				const response = await axios.get(`/api/getpurchasedetails/${id}`); // Assuming there's an API endpoint to fetch ticket details
				setTicketDetails(response.data.data);
			} catch (error) {
				console.error("Error fetching ticket details", error);
			}
		};

		if (id) {
			fetchTicketDetails();
		}
	}, [id]);

	return (
		<div>
			<h1>Event Ticket Details</h1>
			{ticketDetails ? (
				<>
					<p>Email: {ticketDetails.email}</p>
					<p>Name: {ticketDetails.name}</p>
					<p>Phone: {ticketDetails.phoneNumber}</p>
					<p>T-shirt Size: {ticketDetails.size}</p>
					<p>Image URL: {ticketDetails.imageUrl}</p>
					{/* Add more details as needed */}
				</>
			) : (
				<p>Loading ticket details...</p>
			)}
		</div>
	);
};

export default EventTicket;

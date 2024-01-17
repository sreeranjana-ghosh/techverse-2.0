"use client";
import { useEffect, useState } from "react";

export default function TimerCount() {
	const [endTime, setEndTime] = useState(false);
	useEffect(() => {
		const targetDate = new Date("2024-02-08T23:59:59").getTime();
		let previousTimeBetweenDates;
		setInterval(() => {
			const currentDate = new Date().getTime();
			const difference = targetDate - currentDate;
			if (difference <= 0) {
				clearInterval();
				setEndTime(true);
				return;
			}
			flipAllCards(difference);
			previousTimeBetweenDates = difference;
		}, 250);

		function flipAllCards(difference) {
			const days = Math.floor(difference / (1000 * 60 * 60 * 24));
			const hours = Math.floor(
				(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			const minutes = Math.floor(
				(difference % (1000 * 60 * 60)) / (1000 * 60)
			);
			const seconds = Math.floor((difference % (1000 * 60)) / 1000);
			flip(
				document.querySelector("[data-days-tens]"),
				Math.floor(days / 10)
			);
			flip(document.querySelector("[data-days-ones]"), days % 10);
			flip(
				document.querySelector("[data-hours-tens]"),
				Math.floor(hours / 10)
			);
			flip(document.querySelector("[data-hours-ones]"), hours % 10);
			flip(
				document.querySelector("[data-minutes-tens]"),
				Math.floor(minutes / 10)
			);
			flip(document.querySelector("[data-minutes-ones]"), minutes % 10);
			flip(
				document.querySelector("[data-seconds-tens]"),
				Math.floor(seconds / 10)
			);
			flip(document.querySelector("[data-seconds-ones]"), seconds % 10);
		}

		function flip(flipCard, newNumber) {
			const topHalf = flipCard.querySelector(".top");
			const startNumber = parseInt(topHalf.textContent);
			if (newNumber === startNumber) return;

			const bottomHalf = flipCard.querySelector(".bottom");
			const topFlip = document.createElement("div");
			topFlip.classList.add("top-flip");
			const bottomFlip = document.createElement("div");
			bottomFlip.classList.add("bottom-flip");

			top.textContent = startNumber;
			bottomHalf.textContent = startNumber;
			topFlip.textContent = startNumber;
			bottomFlip.textContent = newNumber;

			topFlip.addEventListener("animationstart", (e) => {
				topHalf.textContent = newNumber;
			});
			topFlip.addEventListener("animationend", (e) => {
				topFlip.remove();
			});
			bottomFlip.addEventListener("animationend", (e) => {
				bottomHalf.textContent = newNumber;
				bottomFlip.remove();
			});
			flipCard.append(topFlip, bottomFlip);
		}
	}, []);
	return (
		<>
			<div className="h-auto w-screen flex flex-col justify-center items-center font-young text-6xl md:text-8xl">
				<h1 className="text-center text-3xl text-white mb-10">
					We are Launching Soon!
				</h1>
				<div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
					<div className="container-segment">
						<div className="segment-title bg-gradient bg-white text-black rounded-full flex justify-center items-center w-36 text-xs md:text-3xl md:w-56">
							Days
						</div>
						<div className="segment">
							<div
								className="flip-card text-black"
								data-days-tens
							>
								<div className="top bg-gradient-up">2</div>
								<div className="bottom bg-gradient-down">2</div>
							</div>
							<div
								className="flip-card text-black"
								data-days-ones
							>
								<div className="top bg-gradient-up">4</div>
								<div className="bottom bg-gradient-down">4</div>
							</div>
						</div>
					</div>
					<div className="container-segment">
						<div className="segment-title bg-gradient bg-white text-black rounded-full w-36 flex justify-center items-center text-xs md:text-3xl md:w-60">
							Hours
						</div>
						<div className="segment">
							<div
								className="flip-card text-black"
								data-hours-tens
							>
								<div className="top bg-gradient-up">0</div>
								<div className="bottom bg-gradient-down">0</div>
							</div>
							<div
								className="flip-card text-black"
								data-hours-ones
							>
								<div className="top bg-gradient-up">0</div>
								<div className="bottom bg-gradient-down">0</div>
							</div>
						</div>
					</div>
					<div className="container-segment">
						<div className="segment-title bg-gradient bg-white text-black rounded-full w-36 flex justify-center items-center text-xs md:text-3xl md:w-60">
							Minutes
						</div>
						<div className="segment">
							<div
								className="flip-card text-black"
								data-minutes-tens
							>
								<div className="top bg-gradient-up">0</div>
								<div className="bottom bg-gradient-down">0</div>
							</div>
							<div
								className="flip-card text-black"
								data-minutes-ones
							>
								<div className="top bg-gradient-up">0</div>
								<div className="bottom bg-gradient-down">0</div>
							</div>
						</div>
					</div>
					<div className="container-segment">
						<div className="segment-title bg-gradient bg-white text-black rounded-full w-36 flex justify-center items-center text-xs md:text-3xl md:w-60">
							Seconds
						</div>
						<div className="segment">
							<div
								className="flip-card text-black"
								data-seconds-tens
							>
								<div className="top bg-gradient-up">0</div>
								<div className="bottom bg-gradient-down">0</div>
							</div>
							<div
								className="flip-card text-black"
								data-seconds-ones
							>
								<div className="top bg-gradient-up">0</div>
								<div className="bottom bg-gradient-down">0</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

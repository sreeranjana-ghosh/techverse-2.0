"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const phrase =
	"Techvesre is tech fiesta, organized by Computer Science Department of Guru Nanak Institute of Technology, Kolkata. It is a platform for students to showcase their technical and creative skills, participate in competitions.";

function index() {
	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		const size = window.innerWidth <= 768;
		setIsMobile(size);
	}, []);
	return (
		<section className="hero">
			{isMobile ? (
				<div className="mt-28">
					<h1 className="text-white text-6xl font-extrabold bg-clip-text text-transparent inline-block bg-gradient-to-b from-white to-black font-young">
						Techverse
					</h1>
				</div>
			) : (
				<div className="controls mt-[5vw]">
					<h1 className="abtTech">Techverse</h1>
				</div>
			)}
			<MaskText />
		</section>
	);
}

export default index;

export function MaskText() {
	const animation = {
		initial: { y: "100%" },
		enter: (i) => ({
			y: "0",
			transition: {
				duration: 0.75,
				ease: [0.33, 1, 0.68, 1],
				delay: 0.075 * i,
			},
		}),
	};

	const { ref, inView, entry } = useInView({
		threshold: 0.75,
		triggerOnce: true,
	});

	return (
		<div ref={ref} className="body mt-10 mb-10 md:mt-0 md:mb-0">
			{
				<div className="lineMask">
					<motion.p
						variants={animation}
						initial="initial"
						animate={inView ? "enter" : ""}
					>
						{phrase}
					</motion.p>
				</div>
			}
		</div>
	);
}

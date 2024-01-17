"use client";
import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import dynamic from "next/dynamic";
import Image from "next/image";
import Timer from "./timer/Timer";
import TimerCount from "./mobileTimer/TimerCount";

const targetDate = new Date("2024-02-08T23:59:59").getTime();

const Earth = dynamic(() => import("@/components/home/countdown/earth/index"), {
	ssr: false,
	loading: () => (
		<Image src={"/earth/placeholder.png"} alt="Earth" fill={true} />
	),
});

function Index() {
	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		const size = window.innerWidth <= 768;
		setIsMobile(size);
	}, []);
	return isMobile ? (
		<TimerCount />
	) : (
		<div className={styles.main}>
			<Earth />
			<Timer targetDate={targetDate} />
		</div>
	);
}

export default Index;

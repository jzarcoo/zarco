"use client";

import { useEffect, useRef } from "react";

const NUM_BARS = 35;

// Deterministic starting heights so server and client markup match (no hydration
// mismatch); the animation shuffles them after mount.
const initialHeights = Array.from(
	{ length: NUM_BARS },
	(_, i) => 12 + ((i * 41) % 86),
);

export default function SortingBars() {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		const bars = Array.from(container.children) as HTMLElement[];
		const id = window.setInterval(() => {
			const i = Math.floor(Math.random() * bars.length);
			const j = Math.floor(Math.random() * bars.length);
			const tmp = bars[i].style.height;
			bars[i].style.height = bars[j].style.height;
			bars[j].style.height = tmp;
			bars[i].style.background = "#60a5fa";
			bars[j].style.background = "#60a5fa";
			window.setTimeout(() => {
				bars[i].style.background = "";
				bars[j].style.background = "";
			}, 150);
		}, 200);

		return () => window.clearInterval(id);
	}, []);

	return (
		<div
			ref={containerRef}
			aria-hidden="true"
			className="flex h-32 w-full items-end gap-[2px] px-2"
		>
			{initialHeights.map((h, i) => (
				<span
					key={i}
					className="w-full rounded-t-sm transition-[height] duration-200"
					style={{
						height: `${h}%`,
						background: "linear-gradient(to top, #3b82f6, #93c5fd)",
					}}
				/>
			))}
		</div>
	);
}

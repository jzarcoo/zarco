"use client";

import { useEffect, useRef } from "react";

/**
 * Animated node-network background — a dependency-free 2D-canvas take on the
 * Three.js particle field from the design reference. Sits fixed behind all
 * content; glass panels let it show through. Respects prefers-reduced-motion.
 */
export default function CanvasBackground() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvasRefValue = canvasRef.current;
		if (!canvasRefValue) return;
		const ctxRefValue = canvasRefValue.getContext("2d");
		if (!ctxRefValue) return;

		const canvas: HTMLCanvasElement = canvasRefValue;
		const ctx: CanvasRenderingContext2D = ctxRefValue;

		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		const dpr = Math.min(window.devicePixelRatio || 1, 2);

		type Node = { x: number; y: number; vx: number; vy: number };
		let nodes: Node[] = [];
		let width = 0;
		let height = 0;
		let raf = 0;

		const LINK_DISTANCE = 150;

		function seed() {
			width = window.innerWidth;
			height = window.innerHeight;
			canvas.width = Math.floor(width * dpr);
			canvas.height = Math.floor(height * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

			const count = Math.max(
				24,
				Math.min(120, Math.round((width * height) / 16000)),
			);
			nodes = Array.from({ length: count }, () => ({
				x: Math.random() * width,
				y: Math.random() * height,
				vx: (Math.random() - 0.5) * 0.35,
				vy: (Math.random() - 0.5) * 0.35,
			}));
		}

		function draw() {
			ctx.clearRect(0, 0, width, height);

			for (const n of nodes) {
				n.x += n.vx;
				n.y += n.vy;
				if (n.x <= 0 || n.x >= width) n.vx *= -1;
				if (n.y <= 0 || n.y >= height) n.vy *= -1;
			}

			for (let i = 0; i < nodes.length; i++) {
				for (let j = i + 1; j < nodes.length; j++) {
					const a = nodes[i];
					const b = nodes[j];
					const dist = Math.hypot(a.x - b.x, a.y - b.y);
					if (dist < LINK_DISTANCE) {
						const alpha = 0.25 * (1 - dist / LINK_DISTANCE);
						ctx.strokeStyle = `rgba(59, 130, 246, ${alpha.toFixed(3)})`;
						ctx.lineWidth = 1;
						ctx.beginPath();
						ctx.moveTo(a.x, a.y);
						ctx.lineTo(b.x, b.y);
						ctx.stroke();
					}
				}
			}

			ctx.fillStyle = "rgba(147, 197, 253, 0.85)";
			for (const n of nodes) {
				ctx.beginPath();
				ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
				ctx.fill();
			}
		}

		function loop() {
			draw();
			raf = window.requestAnimationFrame(loop);
		}

		function handleResize() {
			seed();
			if (reduceMotion) draw();
		}

		seed();
		if (reduceMotion) {
			draw();
		} else {
			loop();
		}
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
			window.cancelAnimationFrame(raf);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			aria-hidden="true"
			className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
			style={{
				background:
					"radial-gradient(ellipse at 50% -10%, #0b1f38 0%, #050b14 55%)",
			}}
		/>
	);
}

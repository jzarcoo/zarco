import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-sans)", "system-ui", "sans-serif"],
				mono: ["var(--font-mono)", "ui-monospace", "monospace"],
			},
			colors: {
				// Bright, professional, academic-tech palette. Green is the accent.
				ink: "#12241f", // headings — soft near-black with a green cast
				body: "#33453f", // body text — dark green-blue
				muted: "#657a72", // secondary text
				line: "#e6ece9", // borders / dividers
				surface: "#f5f8f6", // slightly warm off-white surfaces
				accent: {
					DEFAULT: "#0f8a5f", // friendly emerald that pops on white
					strong: "#0a6e49", // hover / pressed / small text
					soft: "#e4f3ec", // tint background for badges / chips / hovers
				},
			},
		},
	},
	plugins: [],
} satisfies Config;

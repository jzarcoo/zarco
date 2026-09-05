import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CanvasBackground from "@/components/CanvasBackground";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
	display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
	display: "swap",
});

export const metadata: Metadata = {
	title: {
		template: "%s | Antonio Zarco",
		default: "Antonio Zarco — CS Student",
	},
	description:
		"Portfolio of Antonio Zarco, CS student at UNAM specializing in algorithms, machine learning, and computer vision.",
	metadataBase: new URL("https://jzarcoo.github.io/zarco"),
	// favicon is auto-detected from src/app/favicon.ico; an explicit relative
	// "./favicon.ico" here resolves to /projects/favicon.ico on dynamic project
	// pages and breaks the static export.
};

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "Antonio Zarco",
	url: "https://jzarcoo.github.io/zarco",
	sameAs: [
		"https://www.linkedin.com/in/antoniozarco/",
		"https://github.com/jzarcoo",
	],
	jobTitle: "Computer Science Student",
	alumniOf: "UNAM",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
			<body
				className={`${inter.variable} ${jetbrainsMono.variable} relative min-h-screen`}
			>
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4
					           focus:z-[100] focus:rounded focus:bg-blue-500 focus:px-4 focus:py-2
					           focus:text-sm focus:text-white focus:shadow-lg focus:outline-none"
				>
					Skip to main content
				</a>

				<CanvasBackground />

				<div className="relative z-10 flex min-h-screen flex-col items-center px-4 pt-6 pb-12 md:px-8 lg:px-12">
					<SiteNav />
					<main
						id="main-content"
						className="flex w-full max-w-7xl flex-grow flex-col items-center"
					>
						{children}
					</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}

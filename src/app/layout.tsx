import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/components/Providers";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: {
		template: "%s | Antonio Zarco",
		default: "Antonio Zarco — CS Student",
	},
	description:
		"Portfolio of Antonio Zarco, CS student at UNAM specializing in algorithms, machine learning, and computer vision.",
	metadataBase: new URL("https://jzarcoo.github.io/zarco"),
	icons: {
		icon: "./favicon.ico",
	},
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
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4
					           focus:z-[100] focus:px-4 focus:py-2 focus:bg-teal-600 focus:text-white
					           focus:text-sm focus:rounded focus:outline-none focus:shadow-lg"
				>
					Skip to main content
				</a>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}

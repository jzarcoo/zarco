import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import DarkModeButton from "@/components/DarkModeButton";

export const metadata: Metadata = {
	title: "Antonio Zarco — CS Student",
	description:
		"Portfolio of Antonio Zarco, CS student at UNAM specializing in algorithms, machine learning, and computer vision.",
	openGraph: {
		title: "Antonio Zarco — CS Student",
		description:
			"Portfolio of Antonio Zarco, CS student at UNAM specializing in algorithms, machine learning, and computer vision.",
		url: "https://jzarcoo.github.io/zarco",
		siteName: "Antonio Zarco",
		images: [{ url: "/og-image.png", width: 1200, height: 630 }],
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Antonio Zarco — CS Student",
		description:
			"Portfolio of Antonio Zarco, CS student at UNAM specializing in algorithms, machine learning, and computer vision.",
		images: ["/og-image.png"],
	},
};

export default function Home() {
	return (
		<div className="text-gray-900 dark:text-gray-200 dark:bg-gray-900 bg-gray-200 font-[family-name:var(--font-geist-sans)]">
			<Navbar />
			<main id="main-content" className="scroll-smooth pt-10">
				<Header />
			</main>
			<DarkModeButton />
			<Footer />
		</div>
	);
}

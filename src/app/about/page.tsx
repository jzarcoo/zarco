import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Specializations from "@/components/Specializations";
import SocialLinks from "@/components/SocialLinks";
import { meImage } from "@/lib/projectImages";

export const metadata: Metadata = {
	title: "About",
	description:
		"Antonio Zarco is a computer science student at UNAM working across algorithms, machine learning, computer vision, and full-stack development.",
};

export default function AboutPage() {
	return (
		<div className="flex w-full flex-col items-center gap-12">
			<section className="glass-panel flex w-full max-w-4xl flex-col items-center gap-8 px-6 py-10 md:flex-row md:px-10 md:text-left">
				<div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-full border border-blue-400/40 bg-gradient-to-b from-blue-500/40 to-transparent shadow-[var(--glow-shadow)]">
					<Image
						src={meImage}
						alt="Antonio Zarco"
						fill
						sizes="160px"
						className="object-cover"
						priority
					/>
				</div>

				<div className="text-center md:text-left">
					<p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-blue-300">
						CS Student &middot; UNAM
					</p>
					<h1 className="text-glow text-3xl font-bold tracking-wide text-white md:text-4xl">
						Antonio Zarco
					</h1>
					<p className="mt-4 max-w-xl text-blue-200">
						I&rsquo;m a computer science student at UNAM. I build across
						algorithms and data structures, machine learning and computer
						vision, concurrent systems, and full-stack web apps &mdash; from a
						PyTorch model that now powers a production dictionary to a
						terminal maze game written in C.
					</p>
					<SocialLinks className="mt-6 justify-center text-3xl md:justify-start" />
				</div>
			</section>

			<Specializations />

			<section className="glass-panel w-full max-w-4xl px-6 py-8 text-center md:px-10">
				<h2 className="text-lg font-semibold text-blue-100">
					Want the details?
				</h2>
				<p className="mx-auto mt-2 max-w-xl text-sm text-blue-200/80">
					Every project has its own page with the approach, stack, features,
					and links to the source and live demo.
				</p>
				<div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
					<Link
						href="/projects"
						className="w-full rounded-md bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-400 sm:w-auto"
					>
						Browse projects
					</Link>
					<Link
						href="/contact"
						className="w-full rounded-md border border-blue-400/50 px-6 py-2.5 text-sm font-semibold text-blue-100 transition-colors hover:bg-blue-500/10 sm:w-auto"
					>
						Contact me
					</Link>
				</div>
			</section>
		</div>
	);
}

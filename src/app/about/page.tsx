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
			<section className="glass-panel flex w-full max-w-4xl flex-col items-center gap-8 px-6 py-10 md:flex-row md:items-center md:px-10 md:text-left">
				<div className="relative h-44 w-44 shrink-0 overflow-hidden rounded-[2rem] bg-accent-soft">
					<Image
						src={meImage}
						alt="Antonio Zarco"
						fill
						sizes="176px"
						className="object-cover object-top"
						priority
					/>
				</div>

				<div className="text-center md:text-left">
					<span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold tracking-wide text-accent-strong">
						CS Student &middot; UNAM
					</span>
					<h1 className="mt-3 text-3xl font-bold tracking-tight text-ink md:text-4xl">
						Antonio Zarco
					</h1>
					<p className="mt-4 max-w-xl leading-relaxed text-body">
						I&rsquo;m a computer science student at UNAM. I build across
						algorithms and data structures, machine learning and computer
						vision, concurrent systems, and full-stack web apps &mdash; from a
						PyTorch model that now powers a production dictionary to a terminal
						maze game written in C.
					</p>
					<SocialLinks
						withLabels
						className="mt-6 justify-center md:justify-start"
					/>
				</div>
			</section>

			<Specializations />

			<section className="glass-panel w-full max-w-4xl px-6 py-8 text-center md:px-10">
				<h2 className="text-lg font-semibold text-ink">Want the details?</h2>
				<p className="mx-auto mt-2 max-w-xl text-sm text-muted">
					Every project has its own page with the approach, stack, features, and
					links to the source and live demo.
				</p>
				<div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
					<Link
						href="/projects"
						className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-strong sm:w-auto"
					>
						Browse projects
					</Link>
					<Link
						href="/contact"
						className="w-full rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent/40 hover:bg-accent-soft sm:w-auto"
					>
						Contact me
					</Link>
				</div>
			</section>
		</div>
	);
}

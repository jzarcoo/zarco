import Link from "next/link";
import SocialLinks from "./SocialLinks";

export default function Hero() {
	return (
		<section className="glass-panel relative z-10 mb-14 w-full max-w-3xl px-8 py-10 text-center md:px-16 md:py-12">
			<p className="mb-3 font-mono text-xs tracking-[0.3em] text-blue-300">
				CS STUDENT &middot; UNAM
			</p>
			<h1 className="text-glow mb-4 text-4xl font-bold tracking-wide text-white md:text-5xl">
				ANTONIO ZARCO
			</h1>
			<p className="mx-auto max-w-xl text-lg font-light text-blue-200 md:text-xl">
				Building systems across algorithms, machine learning, and computer
				vision.
			</p>

			<div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
				<Link
					href="/projects"
					className="w-full rounded-md bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-400 sm:w-auto"
				>
					View projects
				</Link>
				<Link
					href="/about"
					className="w-full rounded-md border border-blue-400/50 px-6 py-2.5 text-sm font-semibold text-blue-100 transition-colors hover:bg-blue-500/10 sm:w-auto"
				>
					About me
				</Link>
			</div>

			<SocialLinks className="mt-8 justify-center text-3xl" />
		</section>
	);
}

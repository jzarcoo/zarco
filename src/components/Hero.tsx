import Image from "next/image";
import Link from "next/link";
import SocialLinks from "./SocialLinks";
import { githubImage } from "@/lib/projectImages";

export default function Hero() {
	return (
		<section className="relative z-10 w-full max-w-7xl py-4 md:py-12">
			<div className="flex flex-col-reverse items-center gap-10 lg:grid lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-8">
				{/* Left — content */}
				<div className="w-full text-center lg:text-left">
					<span className="inline-block rounded-full bg-accent-soft px-3.5 py-1.5 text-xs font-semibold tracking-wide text-accent-strong">
						CS Student &middot; UNAM
					</span>

					<h1 className="mt-5 text-[2.75rem] font-bold leading-[1.03] tracking-tight text-ink sm:text-6xl lg:text-[4.25rem]">
						Antonio Zarco
					</h1>

					<p className="mt-3 text-xl font-medium text-body sm:text-2xl">
						Computer Science Student
					</p>

					<p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted lg:mx-0">
						Building systems across algorithms, machine learning, and computer
						vision.
					</p>

					<div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
						<Link
							href="/projects"
							className="group flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-accent-strong hover:shadow-md sm:w-auto"
						>
							View projects
							<span
								aria-hidden="true"
								className="transition-transform duration-200 group-hover:translate-x-0.5"
							>
								&rarr;
							</span>
						</Link>
						<Link
							href="/about"
							className="flex w-full items-center justify-center gap-2 rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors duration-200 hover:border-accent/40 hover:bg-accent-soft sm:w-auto"
						>
							About me
						</Link>
					</div>

					<SocialLinks
						withLabels
						className="mt-7 justify-center text-lg lg:justify-start"
					/>
				</div>

				{/* Right — the GitHub octocat, floating in the same soft organic green
				    space. The fixed node-network animation and the page's watercolor
				    shapes sit behind it. */}
				<div className="relative flex w-full items-center justify-center overflow-hidden py-6 lg:py-4">
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 overflow-hidden"
					>
						<div
							className="absolute -right-8 -top-4 h-64 w-64 rounded-full blur-3xl"
							style={{
								background:
									"radial-gradient(circle at 40% 40%, rgba(110, 231, 183, 0.5), transparent 70%)",
							}}
						/>
						<div
							className="absolute -bottom-4 -left-6 h-56 w-56 rounded-full blur-3xl"
							style={{
								background:
									"radial-gradient(circle at 50% 50%, rgba(45, 212, 191, 0.36), transparent 70%)",
							}}
						/>
					</div>

					{/* thin flowing node line-art, echoing the background animation */}
					<svg
						aria-hidden="true"
						viewBox="0 0 320 360"
						className="pointer-events-none absolute right-0 top-2 hidden h-[96%] w-[62%] text-accent sm:block"
						fill="none"
					>
						<path
							d="M20 300 C 90 250 60 160 140 130 C 210 105 190 40 280 30"
							stroke="currentColor"
							strokeOpacity="0.35"
							strokeWidth="1.5"
						/>
						<path
							d="M0 220 C 80 210 110 250 180 210 C 250 175 250 250 320 210"
							stroke="currentColor"
							strokeOpacity="0.22"
							strokeWidth="1.5"
						/>
						<g fill="currentColor" fillOpacity="0.55">
							<circle cx="20" cy="300" r="4" />
							<circle cx="140" cy="130" r="4" />
							<circle cx="280" cy="30" r="4" />
							<circle cx="180" cy="210" r="3.5" />
							<circle cx="320" cy="210" r="3.5" />
						</g>
					</svg>

					{/* soft green medallion behind the octocat */}
					<div
						aria-hidden="true"
						className="absolute h-56 w-56 rounded-full sm:h-72 sm:w-72 lg:h-80 lg:w-80"
						style={{
							background:
								"radial-gradient(circle, rgba(228, 243, 236, 0.95), rgba(228, 243, 236, 0) 70%)",
						}}
					/>

					<Image
						src={githubImage}
						alt="Octocat, GitHub's mascot"
						unoptimized
						priority
						sizes="(max-width: 640px) 11rem, (max-width: 1024px) 14rem, 18rem"
						className="relative h-auto w-44 [image-rendering:pixelated] sm:w-56 lg:w-72"
					/>
				</div>
			</div>
		</section>
	);
}

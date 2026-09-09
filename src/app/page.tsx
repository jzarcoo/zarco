import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import DisciplineCards from "@/components/DisciplineCards";
import AboutTeaser from "@/components/AboutTeaser";
import ProjectCard from "@/components/ProjectCard";
import { featuredProjects } from "@/lib/projects";

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
		<div className="flex w-full flex-col items-center gap-16">
			<Hero />

			<DisciplineCards />

			<section
				aria-labelledby="featured-heading"
				className="z-10 w-full max-w-7xl"
			>
				<div className="mb-6 flex items-end justify-between gap-4">
					<div className="flex items-center gap-3">
						<span
							aria-hidden="true"
							className="h-0.5 w-8 rounded-full bg-accent"
						/>
						<div>
							<h2
								id="featured-heading"
								className="text-lg font-semibold text-ink"
							>
								Featured projects
							</h2>
							<p className="mt-1 text-sm text-muted">
								A selection across engineering, ML, and games.
							</p>
						</div>
					</div>
					<Link
						href="/projects"
						className="shrink-0 text-sm font-medium text-accent transition-colors hover:text-accent-strong"
					>
						All projects &rarr;
					</Link>
				</div>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{featuredProjects.map((project) => (
						<ProjectCard key={project.slug} project={project} />
					))}
				</div>
			</section>

			<AboutTeaser />
		</div>
	);
}

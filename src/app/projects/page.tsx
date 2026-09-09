import type { Metadata } from "next";
import ProjectShowcase from "@/components/ProjectShowcase";

export const metadata: Metadata = {
	title: "Projects",
	description:
		"Algorithms, software engineering projects, machine learning research, and games by Antonio Zarco.",
};

export default function ProjectsPage() {
	return (
		<div className="flex w-full flex-col items-center gap-12">
			<header className="w-full max-w-7xl">
				<span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold tracking-wide text-accent-strong">
					Portfolio
				</span>
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-ink md:text-5xl">
					Projects
				</h1>
				<p className="mt-3 max-w-2xl text-muted">
					Fourteen projects spanning algorithms and competitive-programming
					math, concurrent systems, machine learning models, full-stack apps,
					and games. Select any card for the full write-up.
				</p>
			</header>

			<ProjectShowcase />
		</div>
	);
}

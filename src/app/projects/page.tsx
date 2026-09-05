import type { Metadata } from "next";
import ProjectShowcase from "@/components/ProjectShowcase";

export const metadata: Metadata = {
	title: "Projects",
	description:
		"Algorithms, software engineering projects, machine learning research, and games by Antonio Zarco.",
};

export default function ProjectsPage() {
	return (
		<div className="flex w-full flex-col items-center gap-10">
			<header className="glass-panel w-full max-w-7xl px-8 py-10 text-center">
				<h1 className="text-glow text-3xl font-bold tracking-wide text-white md:text-4xl">
					PROJECTS
				</h1>
				<p className="mx-auto mt-3 max-w-2xl text-blue-200">
					Fourteen projects spanning algorithms and competitive-programming
					math, concurrent systems, machine learning models, full-stack apps,
					and games. Select any card for the full write-up.
				</p>
			</header>

			<ProjectShowcase />
		</div>
	);
}

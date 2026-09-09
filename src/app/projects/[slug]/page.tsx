import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import ToolChips from "@/components/ToolChips";
import { getProject, projects } from "@/lib/projects";

export const dynamicParams = false;

export function generateStaticParams() {
	return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const project = getProject(slug);
	if (!project) return { title: "Project not found" };
	return {
		title: project.title,
		description: project.description,
	};
}

export default async function ProjectDetailPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const project = getProject(slug);
	if (!project) notFound();

	return (
		<article className="flex w-full max-w-4xl flex-col gap-8">
			<Link
				href="/projects"
				className="text-sm font-medium text-accent transition-colors hover:text-accent-strong"
			>
				&larr; All projects
			</Link>

			<header>
				<span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold tracking-wide text-accent-strong">
					{project.categoryLabel}
				</span>
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-ink md:text-4xl">
					{project.title}
				</h1>
				<p className="mt-4 max-w-2xl leading-relaxed text-body">
					{project.description}
				</p>

				<div className="mt-6 flex flex-wrap gap-3">
					{project.repoUrl && (
						<a
							href={project.repoUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
						>
							<FaGithub aria-hidden="true" />
							View repository
						</a>
					)}
					{project.liveUrl && (
						<a
							href={project.liveUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent/40 hover:bg-accent-soft"
						>
							<FiExternalLink aria-hidden="true" />
							{project.liveUrl.includes("canva.com")
								? "View presentation"
								: "Live demo"}
						</a>
					)}
				</div>
			</header>

			<div className="glass-panel relative aspect-[16/9] w-full overflow-hidden bg-surface">
				<Image
					src={project.image}
					alt={`Screenshot of ${project.title}`}
					fill
					sizes="(max-width: 896px) 100vw, 896px"
					className="object-contain"
					priority
				/>
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				<section className="glass-panel px-6 py-6">
					<h2 className="mb-4 text-base font-semibold text-ink">Technologies</h2>
					<ToolChips tools={project.tools} />
				</section>

				{project.features.length > 0 && (
					<section className="glass-panel px-6 py-6">
						<h2 className="mb-4 text-base font-semibold text-ink">
							Main features
						</h2>
						<ul className="flex flex-col gap-2 text-sm text-body">
							{project.features.map((feature) => (
								<li key={feature} className="flex gap-2">
									<span aria-hidden="true" className="text-accent">
										&rarr;
									</span>
									<span>{feature}</span>
								</li>
							))}
						</ul>
					</section>
				)}
			</div>

			<div className="glass-panel flex items-center justify-between gap-4 px-6 py-5 text-sm">
				<Link
					href="/projects"
					className="font-medium text-accent transition-colors hover:text-accent-strong"
				>
					&larr; Back to all projects
				</Link>
				<Link
					href="/contact"
					className="font-medium text-accent transition-colors hover:text-accent-strong"
				>
					Get in touch &rarr;
				</Link>
			</div>
		</article>
	);
}

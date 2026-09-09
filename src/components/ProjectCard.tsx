import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import ToolChips from "./ToolChips";

const categoryBadge: Record<Project["category"], string> = {
	algorithms: "Algorithms",
	software: "Software",
	ml: "ML",
	games: "Game",
};

export default function ProjectCard({ project }: { project: Project }) {
	return (
		<Link
			href={`/projects/${project.slug}`}
			className="glass-panel group flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_26px_50px_-24px_rgba(15,32,28,0.26)] focus-visible:-translate-y-1"
		>
			<div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
				<Image
					src={project.image}
					alt=""
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					className="object-contain transition-transform duration-500 group-hover:scale-105"
				/>
			</div>

			<div className="flex flex-grow flex-col gap-3 border-t border-line bg-white p-5">
				<div className="flex items-center justify-between gap-3">
					<h3 className="text-base font-semibold text-ink">{project.title}</h3>
					<span className="shrink-0 rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent-strong">
						{categoryBadge[project.category]}
					</span>
				</div>

				<p className="line-clamp-3 text-sm leading-relaxed text-muted">
					{project.description}
				</p>

				<ToolChips tools={project.tools.slice(0, 4)} className="mt-auto pt-2" />

				<span className="flex items-center gap-1 text-xs font-medium text-accent transition-colors group-hover:text-accent-strong">
					View project
					<span
						aria-hidden="true"
						className="transition-transform duration-200 group-hover:translate-x-0.5"
					>
						&rarr;
					</span>
				</span>
			</div>
		</Link>
	);
}

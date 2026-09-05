import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import ToolChips from "./ToolChips";

export default function ProjectCard({ project }: { project: Project }) {
	return (
		<Link
			href={`/projects/${project.slug}`}
			className="glass-panel group flex flex-col transition-transform duration-300 hover:-translate-y-1 focus-visible:-translate-y-1"
		>
			<div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
				<Image
					src={project.image}
					alt=""
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					className="object-contain transition-transform duration-500 group-hover:scale-105"
				/>
			</div>

			<div className="flex flex-grow flex-col gap-3 border-t border-white/10 bg-white/5 p-5">
				<div className="flex items-center justify-between gap-3">
					<h3 className="text-lg font-semibold text-blue-100">
						{project.title}
					</h3>
					<span className="shrink-0 rounded-full border border-blue-400/30 px-2 py-0.5 text-[10px] uppercase tracking-wider text-blue-300">
						{
							{
								algorithms: "Algorithms",
								software: "Software",
								ml: "ML",
								games: "Game",
							}[project.category]
						}
					</span>
				</div>

				<p className="line-clamp-3 text-sm text-blue-200/80">
					{project.description}
				</p>

				<ToolChips
					tools={project.tools.slice(0, 4)}
					className="mt-auto pt-2"
				/>

				<span className="text-xs font-medium text-blue-400 transition-colors group-hover:text-blue-300">
					View project &rarr;
				</span>
			</div>
		</Link>
	);
}

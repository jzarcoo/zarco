import { categories, projectsByCategory } from "@/lib/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectShowcase() {
	return (
		<div className="z-10 flex w-full max-w-7xl flex-col gap-16">
			{categories.map((category) => {
				const items = projectsByCategory(category.key);
				if (items.length === 0) return null;

				return (
					<section
						key={category.key}
						id={category.key}
						aria-labelledby={`${category.key}-heading`}
						className="scroll-mt-28"
					>
						<div className="mb-6 flex items-start gap-3">
							<span
								aria-hidden="true"
								className="mt-2.5 h-0.5 w-8 shrink-0 rounded-full bg-accent"
							/>
							<div>
								<h2
									id={`${category.key}-heading`}
									className="text-lg font-semibold text-ink"
								>
									{category.label}
								</h2>
								<p className="mt-1 text-sm text-muted">{category.blurb}</p>
							</div>
						</div>

						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{items.map((project) => (
								<ProjectCard key={project.slug} project={project} />
							))}
						</div>
					</section>
				);
			})}
		</div>
	);
}

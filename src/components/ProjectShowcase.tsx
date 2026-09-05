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
						<div className="glass-panel mb-6 px-6 py-4">
							<h2
								id={`${category.key}-heading`}
								className="text-xl font-semibold text-blue-100"
							>
								{category.label}
							</h2>
							<p className="mt-1 text-sm text-blue-200/70">{category.blurb}</p>
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

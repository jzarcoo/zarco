import Link from "next/link";
import type { IconType } from "react-icons";
import { LuNetwork, LuBrain, LuCode, LuGamepad2 } from "react-icons/lu";
import {
	categories,
	projectsByCategory,
	type CategoryKey,
} from "@/lib/projects";

const icons: Record<CategoryKey, IconType> = {
	algorithms: LuNetwork,
	ml: LuBrain,
	software: LuCode,
	games: LuGamepad2,
};

const shortLabels: Record<CategoryKey, string> = {
	algorithms: "Algorithms",
	ml: "Machine Learning",
	software: "Software Engineering",
	games: "Games",
};

export default function DisciplineCards() {
	return (
		<section
			aria-labelledby="disciplines-heading"
			className="z-10 w-full max-w-7xl"
		>
			<h2 id="disciplines-heading" className="sr-only">
				Areas of focus
			</h2>

			<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
				{categories.map((category) => {
					const Icon = icons[category.key];
					const count = projectsByCategory(category.key).length;
					return (
						<Link
							key={category.key}
							href={`/projects#${category.key}`}
							className="glass-panel group flex flex-col gap-4 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_26px_50px_-24px_rgba(15,32,28,0.26)]"
						>
							<div className="flex items-start justify-between">
								<span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
									<Icon size={20} aria-hidden="true" />
								</span>
								<span
									aria-hidden="true"
									className="text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
								>
									&rarr;
								</span>
							</div>

							<div>
								<h3 className="text-base font-semibold text-ink">
									{shortLabels[category.key]}
								</h3>
								<p className="mt-1 text-sm leading-relaxed text-muted">
									{category.blurb}
								</p>
							</div>

							<span className="mt-auto text-xs font-medium text-muted">
								{count} {count === 1 ? "project" : "projects"}
							</span>
						</Link>
					);
				})}
			</div>
		</section>
	);
}

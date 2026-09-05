import Link from "next/link";

const specializations = [
	{
		label: "Algorithms & Data Structures",
		evidence:
			"Implemented BFS, DFS, Prim's, and Kruskal's for maze generation and solving in Java.",
	},
	{
		label: "Machine Learning",
		evidence:
			"Fine-tuned BERT and trained CNN/LSTM models for fake news detection.",
	},
	{
		label: "Computer Vision",
		evidence:
			"Built a PyTorch CNN for kanji character recognition used in production.",
	},
	{
		label: "Software Engineering",
		evidence:
			"Designed concurrent systems using sockets, threads, and Observer/Publisher patterns.",
	},
	{
		label: "Web Development",
		evidence:
			"Shipped Kanji Ji — a full-stack dictionary with Next.js, React, and Supabase.",
	},
	{
		label: "Systems Programming",
		evidence:
			"Wrote a terminal-based maze game in C with custom rendering and memory management.",
	},
];

export default function Specializations() {
	return (
		<section
			aria-labelledby="specializations-heading"
			className="glass-panel w-full max-w-4xl px-6 py-8 md:px-10"
		>
			<h2
				id="specializations-heading"
				className="mb-6 text-xl font-semibold text-blue-100"
			>
				What I work on
			</h2>

			<div className="grid grid-cols-1 gap-x-8 gap-y-6 text-left md:grid-cols-2">
				{specializations.map(({ label, evidence }) => (
					<div key={label}>
						<p className="mb-1 text-sm font-semibold uppercase tracking-wider text-blue-300">
							{label}
						</p>
						<p className="text-sm leading-relaxed text-blue-200/80">
							{evidence}
						</p>
					</div>
				))}
			</div>

			<Link
				href="/projects"
				className="mt-8 inline-block rounded-md border border-blue-400/50 px-5 py-2 text-sm font-medium text-blue-100 transition-colors hover:bg-blue-500/10"
			>
				View projects &rarr;
			</Link>
		</section>
	);
}

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
			<div className="mb-6 flex items-center gap-3">
				<span aria-hidden="true" className="h-0.5 w-8 rounded-full bg-accent" />
				<h2
					id="specializations-heading"
					className="text-lg font-semibold text-ink"
				>
					What I work on
				</h2>
			</div>

			<div className="grid grid-cols-1 gap-x-8 gap-y-6 text-left md:grid-cols-2">
				{specializations.map(({ label, evidence }) => (
					<div key={label}>
						<p className="mb-1 text-sm font-semibold text-ink">{label}</p>
						<p className="text-sm leading-relaxed text-muted">{evidence}</p>
					</div>
				))}
			</div>

			<Link
				href="/projects"
				className="mt-8 inline-block rounded-full border border-line px-5 py-2 text-sm font-medium text-ink transition-colors hover:border-accent/40 hover:bg-accent-soft"
			>
				View projects &rarr;
			</Link>
		</section>
	);
}

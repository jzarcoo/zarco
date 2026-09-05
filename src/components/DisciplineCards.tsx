import Link from "next/link";
import SortingBars from "./SortingBars";
import NeuralNetworkSVG from "./NeuralNetworkSVG";
import ArchitectureSVG from "./ArchitectureSVG";

export default function DisciplineCards() {
	return (
		<section
			aria-labelledby="disciplines-heading"
			className="z-10 w-full max-w-7xl"
		>
			<h2 id="disciplines-heading" className="sr-only">
				Areas of focus
			</h2>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				{/* Card 1 — Algorithms */}
				<article className="glass-panel flex flex-col">
					<div className="glass-header px-4 py-3 text-sm font-medium text-blue-100">
						1. Algorithms &amp; Data Structures
					</div>
					<div className="flex flex-grow flex-col justify-between bg-black/40 p-4">
						<SortingBars />
					</div>
					<div className="border-t border-white/10 bg-white/5 px-4 py-4">
						<p className="text-sm font-medium text-blue-100">
							Sorting, pathfinding, and graph algorithms — built and visualized.
						</p>
						<Link
							href="/projects#algorithms"
							className="text-xs text-blue-400 transition-colors hover:text-blue-300"
						>
							Explore algorithms projects &rarr;
						</Link>
					</div>
				</article>

				{/* Card 2 — Machine Learning */}
				<article className="glass-panel flex flex-col">
					<div className="glass-header px-4 py-3 text-sm font-medium text-blue-100">
						2. Machine Learning &amp; Computer Vision
					</div>
					<div className="relative flex flex-grow items-center justify-center overflow-hidden bg-black/40 p-4">
						<NeuralNetworkSVG />
					</div>
					<div className="border-t border-white/10 bg-white/5 px-4 py-4">
						<p className="text-sm font-medium text-blue-100">
							Training and evaluating CNN, LSTM, and transformer models.
						</p>
						<Link
							href="/projects#ml"
							className="text-xs text-blue-400 transition-colors hover:text-blue-300"
						>
							Explore ML projects &rarr;
						</Link>
					</div>
				</article>

				{/* Card 3 — Software Engineering */}
				<article className="glass-panel flex flex-col">
					<div className="glass-header px-4 py-3 text-sm font-medium text-blue-100">
						3. Software Engineering &amp; Web Development
					</div>
					<div className="relative flex flex-grow items-center justify-center bg-gray-50/95 p-6">
						<ArchitectureSVG />
					</div>
					<div className="border-t border-white/10 bg-white/5 px-4 py-4">
						<p className="text-sm font-medium text-blue-100">
							Concurrent services, full-stack apps, and clean architecture.
						</p>
						<Link
							href="/projects#software"
							className="text-xs text-blue-400 transition-colors hover:text-blue-300"
						>
							Explore full-stack projects &rarr;
						</Link>
					</div>
				</article>
			</div>
		</section>
	);
}

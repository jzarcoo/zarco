const codeSnippet = `function bfs(graph, start, goal) {
  const queue = [[start]];
  const seen = new Set([start]);

  while (queue.length) {
    const path = queue.shift();
    const node = path.at(-1);
    if (node === goal) return path;

    for (const next of graph[node]) {
      if (seen.has(next)) continue;
      seen.add(next);
      queue.push([...path, next]);
    }
  }
  return null;
}`;

export default function AlgorithmicDeepDive() {
	return (
		<section
			aria-labelledby="deepdive-heading"
			className="z-10 w-full max-w-7xl"
		>
			<div className="glass-panel">
				<div className="glass-header px-6 py-4">
					<h2
						id="deepdive-heading"
						className="text-lg font-medium text-blue-100"
					>
						The Algorithmic Deep-Dive
					</h2>
				</div>

				<div className="relative flex flex-col items-center gap-8 overflow-hidden border-t border-white/5 bg-blue-950/30 p-6 md:flex-row">
					<div
						aria-hidden="true"
						className="blueprint-grid pointer-events-none absolute inset-0 opacity-10"
					/>

					{/* Decorative "notebook" maths — purely visual, matches the reference */}
					<div
						aria-hidden="true"
						className="math-font z-10 flex-1 text-lg leading-relaxed text-blue-200 lg:text-xl"
					>
						<p className="mb-4">
							f(x, y) ={" "}
							<span className="text-2xl">&int;</span>
							<sub className="text-sm">0</sub>
							<sup className="text-sm">n</sup> g(x) dx &minus;{" "}
							<span className="inline-block border-b border-blue-200 px-1">
								&part;L
							</span>
							<span className="inline-block px-1">/ &part;&theta;</span>
						</p>
						<p>
							argmin<sub className="text-sm">&theta;</sub>{" "}
							<span className="text-2xl">&sum;</span>
							<sub className="text-sm">i=1</sub>
							<sup className="text-sm">n</sup> &#8467;( &#375;
							<sub className="text-sm">i</sub>, y<sub className="text-sm">i</sub>{" "}
							) + &lambda; &#8214;&theta;&#8214;<sup className="text-sm">2</sup>
						</p>
					</div>

					{/* Real, readable code */}
					<div className="z-10 w-full flex-1 rounded-lg border border-blue-500/30 bg-[#0a1120]/80 p-4 shadow-inner">
						<pre className="code-block overflow-x-auto whitespace-pre">
							<code>{codeSnippet}</code>
						</pre>
						<a
							href="https://github.com/jzarcoo"
							target="_blank"
							rel="noopener noreferrer"
							className="mt-3 inline-block text-xs text-blue-400 transition-colors hover:text-blue-300"
						>
							Browse the source on GitHub &#8599;
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}

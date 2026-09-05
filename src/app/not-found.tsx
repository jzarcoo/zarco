import Link from "next/link";

export default function NotFound() {
	return (
		<div className="glass-panel w-full max-w-lg px-8 py-12 text-center">
			<p className="text-glow font-mono text-5xl font-bold text-white">404</p>
			<h1 className="mt-4 text-xl font-semibold text-blue-100">
				Page not found
			</h1>
			<p className="mt-2 text-sm text-blue-200/80">
				That route doesn&rsquo;t exist. Try one of these instead.
			</p>
			<div className="mt-6 flex flex-wrap justify-center gap-4 text-sm font-medium text-blue-400">
				<Link href="/" className="hover:text-blue-300">
					Home
				</Link>
				<Link href="/about" className="hover:text-blue-300">
					About
				</Link>
				<Link href="/projects" className="hover:text-blue-300">
					Projects
				</Link>
				<Link href="/contact" className="hover:text-blue-300">
					Contact
				</Link>
			</div>
		</div>
	);
}

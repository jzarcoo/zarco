import Link from "next/link";

export default function NotFound() {
	return (
		<div className="glass-panel w-full max-w-lg px-8 py-12 text-center">
			<p className="text-5xl font-bold text-accent">404</p>
			<h1 className="mt-4 text-xl font-semibold text-ink">Page not found</h1>
			<p className="mt-2 text-sm text-muted">
				That route doesn&rsquo;t exist. Try one of these instead.
			</p>
			<div className="mt-6 flex flex-wrap justify-center gap-4 text-sm font-medium text-accent">
				<Link href="/" className="hover:text-accent-strong">
					Home
				</Link>
				<Link href="/about" className="hover:text-accent-strong">
					About
				</Link>
				<Link href="/projects" className="hover:text-accent-strong">
					Projects
				</Link>
				<Link href="/contact" className="hover:text-accent-strong">
					Contact
				</Link>
			</div>
		</div>
	);
}

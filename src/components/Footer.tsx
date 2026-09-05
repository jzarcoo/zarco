import Link from "next/link";

const Footer = () => {
	return (
		<footer className="z-10 mt-16 w-full max-w-7xl">
			<div className="glass-panel flex flex-col items-center gap-3 px-6 py-6 text-center text-sm text-blue-200/80 sm:flex-row sm:justify-between sm:text-left">
				<p className="font-mono">
					&copy; {new Date().getFullYear()} José Antonio Zarco Romero
				</p>
				<nav aria-label="Footer" className="flex gap-5">
					<Link href="/" className="nav-link">
						Home
					</Link>
					<Link href="/about" className="nav-link">
						About
					</Link>
					<Link href="/projects" className="nav-link">
						Projects
					</Link>
					<Link href="/contact" className="nav-link">
						Contact
					</Link>
				</nav>
			</div>
		</footer>
	);
};

export default Footer;

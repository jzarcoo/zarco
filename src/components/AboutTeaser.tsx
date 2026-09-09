import Link from "next/link";
import { LuGraduationCap } from "react-icons/lu";

export default function AboutTeaser() {
	return (
		<section
			aria-labelledby="about-teaser-heading"
			className="z-10 w-full max-w-7xl"
		>
			<div className="flex items-center gap-3">
				<span aria-hidden="true" className="h-0.5 w-8 rounded-full bg-accent" />
				<h2
					id="about-teaser-heading"
					className="text-lg font-semibold text-ink"
				>
					About me
				</h2>
			</div>

			<div className="mt-6 grid gap-8 md:grid-cols-[1.4fr_1fr] md:gap-12">
				<p className="max-w-xl leading-relaxed text-body">
					I&rsquo;m a computer science student at UNAM, focused on algorithms and
					data structures, machine learning and computer vision, concurrent
					systems, and full-stack web apps &mdash; from a PyTorch model that now
					powers a production dictionary to a terminal maze game written in C.
				</p>

				<div className="flex items-start gap-4">
					<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
						<LuGraduationCap size={20} aria-hidden="true" />
					</span>
					<div>
						<p className="text-xs font-semibold uppercase tracking-wider text-muted">
							Education
						</p>
						<p className="mt-1 font-semibold text-ink">
							UNAM &mdash; Facultad de Ciencias
						</p>
						<p className="text-sm text-muted">B.Sc. in Computer Science</p>
					</div>
				</div>
			</div>

			<Link
				href="/about"
				className="mt-6 inline-block text-sm font-medium text-accent transition-colors hover:text-accent-strong"
			>
				More about me &rarr;
			</Link>
		</section>
	);
}

import type { Metadata } from "next";
import { AiFillGithub, AiFillLinkedin, AiFillMail } from "react-icons/ai";

export const metadata: Metadata = {
	title: "Contact",
	description: "Get in touch with Antonio Zarco.",
};

const channels = [
	{
		label: "Email",
		value: "zarco@ieee.org",
		href: "mailto:zarco@ieee.org",
		Icon: AiFillMail,
		external: false,
	},
	{
		label: "LinkedIn",
		value: "in/antoniozarco",
		href: "https://www.linkedin.com/in/antoniozarco/",
		Icon: AiFillLinkedin,
		external: true,
	},
	{
		label: "GitHub",
		value: "github.com/jzarcoo",
		href: "https://github.com/jzarcoo",
		Icon: AiFillGithub,
		external: true,
	},
];

export default function ContactPage() {
	return (
		<div className="flex w-full max-w-2xl flex-col items-center gap-8">
			<header className="w-full text-center">
				<span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold tracking-wide text-accent-strong">
					Get in touch
				</span>
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-ink md:text-4xl">
					Contact
				</h1>
				<p className="mx-auto mt-3 max-w-md text-muted">
					Open to internships, research collaborations, and interesting
					problems. The fastest way to reach me is email.
				</p>
			</header>

			<ul className="flex w-full flex-col gap-4">
				{channels.map(({ label, value, href, Icon, external }) => (
					<li key={label}>
						<a
							href={href}
							{...(external
								? { target: "_blank", rel: "noopener noreferrer" }
								: {})}
							className="glass-panel flex items-center gap-4 px-6 py-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-22px_rgba(15,32,28,0.24)]"
						>
							<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
								<Icon aria-hidden="true" className="text-xl" />
							</span>
							<span className="flex flex-col">
								<span className="text-xs font-semibold uppercase tracking-wider text-muted">
									{label}
								</span>
								<span className="font-medium text-ink">{value}</span>
							</span>
							<span aria-hidden="true" className="ml-auto text-accent">
								&rarr;
							</span>
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}

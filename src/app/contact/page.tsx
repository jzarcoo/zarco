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
			<header className="glass-panel w-full px-8 py-10 text-center">
				<h1 className="text-glow text-3xl font-bold tracking-wide text-white md:text-4xl">
					CONTACT
				</h1>
				<p className="mx-auto mt-3 max-w-md text-blue-200">
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
							className="glass-panel flex items-center gap-4 px-6 py-5 transition-transform duration-300 hover:-translate-y-0.5"
						>
							<Icon
								aria-hidden="true"
								className="text-3xl text-blue-300"
							/>
							<span className="flex flex-col">
								<span className="text-xs uppercase tracking-wider text-blue-300">
									{label}
								</span>
								<span className="text-blue-100">{value}</span>
							</span>
							<span
								aria-hidden="true"
								className="ml-auto text-blue-400"
							>
								&rarr;
							</span>
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}

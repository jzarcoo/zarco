import { AiFillGithub, AiFillLinkedin, AiFillMail } from "react-icons/ai";

const links = [
	{
		href: "https://www.linkedin.com/in/antoniozarco/",
		label: "Antonio Zarco on LinkedIn",
		text: "LinkedIn",
		Icon: AiFillLinkedin,
		external: true,
	},
	{
		href: "https://github.com/jzarcoo",
		label: "Antonio Zarco on GitHub",
		text: "GitHub",
		Icon: AiFillGithub,
		external: true,
	},
	{
		href: "mailto:zarco@ieee.org",
		label: "Email Antonio Zarco",
		text: "zarco@ieee.org",
		Icon: AiFillMail,
		external: false,
	},
];

export default function SocialLinks({
	className = "",
	size = "text-3xl",
	withLabels = false,
}: {
	className?: string;
	size?: string;
	withLabels?: boolean;
}) {
	return (
		<div
			className={`flex flex-wrap items-center gap-x-6 gap-y-2 ${withLabels ? "" : size} ${className}`}
		>
			{links.map(({ href, label, text, Icon, external }) => (
				<a
					key={href}
					href={href}
					aria-label={label}
					{...(external
						? { target: "_blank", rel: "noopener noreferrer" }
						: {})}
					className={
						withLabels
							? "flex items-center gap-2 text-sm font-medium text-muted transition-colors duration-200 hover:text-accent"
							: "text-muted transition-all duration-300 hover:-translate-y-0.5 hover:text-accent"
					}
				>
					<Icon aria-hidden="true" className={withLabels ? "text-lg" : ""} />
					{withLabels && <span>{text}</span>}
				</a>
			))}
		</div>
	);
}

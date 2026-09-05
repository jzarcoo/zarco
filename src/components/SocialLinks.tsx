import { AiFillGithub, AiFillLinkedin, AiFillMail } from "react-icons/ai";

const links = [
	{
		href: "https://www.linkedin.com/in/antoniozarco/",
		label: "Antonio Zarco on LinkedIn",
		Icon: AiFillLinkedin,
		external: true,
	},
	{
		href: "https://github.com/jzarcoo",
		label: "Antonio Zarco on GitHub",
		Icon: AiFillGithub,
		external: true,
	},
	{
		href: "mailto:zarco@ieee.org",
		label: "Email Antonio Zarco",
		Icon: AiFillMail,
		external: false,
	},
];

export default function SocialLinks({
	className = "",
	size = "text-3xl",
}: {
	className?: string;
	size?: string;
}) {
	return (
		<div className={`flex items-center gap-6 ${size} ${className}`}>
			{links.map(({ href, label, Icon, external }) => (
				<a
					key={href}
					href={href}
					aria-label={label}
					{...(external
						? { target: "_blank", rel: "noopener noreferrer" }
						: {})}
					className="text-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:text-blue-100 hover:drop-shadow-[0_0_10px_rgba(147,197,253,0.8)]"
				>
					<Icon aria-hidden="true" />
				</a>
			))}
		</div>
	);
}

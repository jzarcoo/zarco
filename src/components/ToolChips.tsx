import type { ReactNode } from "react";
import {
	FaBootstrap,
	FaCss3,
	FaHtml5,
	FaJava,
	FaPhp,
	FaPython,
	FaReact,
} from "react-icons/fa";
import { FaC } from "react-icons/fa6";
import { PiNetworkX } from "react-icons/pi";
import {
	SiApachemaven,
	SiDart,
	SiExpo,
	SiFlutter,
	SiKeras,
	SiMariadb,
	SiNumpy,
	SiOpencv,
	SiPandas,
	SiPlotly,
	SiPytorch,
	SiScikitlearn,
	SiStreamlit,
	SiSupabase,
	SiTensorflow,
	SiTypescript,
} from "react-icons/si";
import {
	RiGeminiFill,
	RiJavascriptFill,
	RiNextjsFill,
	RiTailwindCssFill,
} from "react-icons/ri";

const iconFor: Record<string, ReactNode> = {
	Bootstrap: <FaBootstrap />,
	C: <FaC />,
	CSS: <FaCss3 />,
	"Gemini API": <RiGeminiFill />,
	HTML: <FaHtml5 />,
	Java: <FaJava />,
	JavaScript: <RiJavascriptFill />,
	MariaDB: <SiMariadb />,
	PHP: <FaPhp />,
	Python: <FaPython />,
	PyTorch: <SiPytorch />,
	Streamlit: <SiStreamlit />,
	Pandas: <SiPandas />,
	NumPy: <SiNumpy />,
	OpenCV: <SiOpencv />,
	Supabase: <SiSupabase />,
	Typescript: <SiTypescript />,
	React: <FaReact />,
	"Next.js": <RiNextjsFill />,
	Tailwind: <RiTailwindCssFill />,
	Maven: <SiApachemaven />,
	"Scikit-learn": <SiScikitlearn />,
	Plotly: <SiPlotly />,
	TensorFlow: <SiTensorflow />,
	Keras: <SiKeras />,
	NetworkX: <PiNetworkX />,
	Flutter: <SiFlutter />,
	Dart: <SiDart />,
	Expo: <SiExpo />,
};

export default function ToolChips({
	tools,
	className = "",
}: {
	tools: string[];
	className?: string;
}) {
	return (
		<ul className={`flex flex-wrap gap-2 ${className}`}>
			{tools.map((tool) => (
				<li
					key={tool}
					className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-xs font-medium text-body"
				>
					<span aria-hidden="true" className="text-sm text-accent">
						{iconFor[tool] ?? null}
					</span>
					{tool}
				</li>
			))}
		</ul>
	);
}

"use client";

import { useTheme } from "next-themes";
import { BsFillMoonStarsFill } from "react-icons/bs";

export default function DarkModeButton() {
	const { theme, setTheme } = useTheme();

	return (
		<button
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			aria-label={
				theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
			}
			className="fixed bottom-6 right-6 z-50 p-2 rounded-md
			           text-gray-900 dark:text-gray-200
			           hover:text-teal-400 dark:hover:text-teal-400
			           transition-colors duration-200"
		>
			<BsFillMoonStarsFill aria-hidden="true" className="text-2xl" />
		</button>
	);
}

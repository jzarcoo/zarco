"use client";

import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar"; 
import DarkModeButton from "../components/DarkModeButton";

export default function Home() {
	const [darkMode, setDarkMode] = useState(true);
	
	return (
		<div className={darkMode ? "dark" : ""}>
			<div className="text-gray-900 dark:text-gray-200 dark:bg-gray-900 bg-gray-200 font-[family-name:var(--font-geist-sans)]">
				<Navbar />
				<main className="scroll-smooth pt-10">
					<Header />
				</main>
				<DarkModeButton darkMode={darkMode} setDarkMode={setDarkMode} />
				<Footer />
			</div>
		</div>
  );
}

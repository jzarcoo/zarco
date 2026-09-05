import type { Metadata } from "next";
import DarkModeButton from "@/components/DarkModeButton";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProjectSwipper from "@/components/ProjectSwipper";

import projectsData from "../../../public/projects/projects.json";
import gamesData from "../../../public/games/games.json";
import machineLearningData from "../../../public/machinelearning/machinelearning.json";

export const metadata: Metadata = {
	title: "Projects",
	description:
		"Software engineering projects, machine learning research, and games by Antonio Zarco.",
};

export default function Projects() {
	return (
		<div className="text-gray-900 dark:text-gray-200 dark:bg-gray-900 bg-gray-200">
			<Navbar />

			<main id="main-content" className="pt-5">
				<section id="projects">
					<h1 className="text-center text-4xl font-bold mb-20 text-teal-600">
						Projects
					</h1>
					<ProjectSwipper projects={projectsData} />
				</section>

				<section id="machine-learning">
					<h2 className="text-center text-4xl font-bold m-20 text-teal-600">
						Machine Learning
					</h2>
					<ProjectSwipper projects={machineLearningData} />
				</section>

				<section id="games">
					<h2 className="text-center text-4xl font-bold m-20 text-teal-600">
						Games
					</h2>
					<ProjectSwipper projects={gamesData} />
				</section>
			</main>

			<DarkModeButton />
			<Footer />
		</div>
	);
}

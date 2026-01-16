"use client";

import { useState } from "react";
import DarkModeButton from "@/components/DarkModeButton";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProjectSwipper from "@/components/ProjectSwipper";

import projectsData from "../../../public/projects/projects.json";
import gamesData from "../../../public/games/games.json";
import machineLearningData from "../../../public/machinelearning/machinelearning.json";

export default function Projects() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="text-gray-900 dark:text-gray-200 dark:bg-gray-900 bg-gray-200">
        <Navbar />

        <main className="pt-5">
          <section id="projects">
            <h1 className="text-center text-4xl font-bold mb-20 text-teal-600">
              Projects
            </h1>
            <ProjectSwipper projects={projectsData} />
          </section>

          <section id="machine-learning">
            <h1 className="text-center text-4xl font-bold m-20 text-teal-600">
              Machine Learning
            </h1>
            <ProjectSwipper projects={machineLearningData} />
          </section>

          <section id="games">
            <h1 className="text-center text-4xl font-bold m-20 text-teal-600">
              Games
            </h1>
            <ProjectSwipper projects={gamesData} />
          </section>
        </main>

        <DarkModeButton darkMode={darkMode} setDarkMode={setDarkMode} />
        <Footer />
      </div>
    </div>
  );
}

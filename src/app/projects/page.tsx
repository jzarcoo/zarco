"use client"

import { useState } from "react";
import DarkModeButton from "@/components/DarkModeButton";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar"; 
import ProjectSwipper from "@/components/ProjectSwipper";
import projectsData from '../../../public/projects/projects.json';
import gamesData from '../../../public/games/games.json';

export default function Projects() {
    const [darkMode, setDarkMode] = useState(true);

    const [projects1] = useState(projectsData);
    const [games] = useState(gamesData);

    return (
        <div className={darkMode ? "dark" : ""}>
            <div className="text-gray-900 dark:text-gray-200 dark:bg-gray-900 bg-gray-200 font-[family-name:var(--font-geist-sans)]">
                <Navbar />
                <main>
                    <h1 className="text-center text-4xl font-bold mb-20 text-teal-600">Projects</h1>
                    <ProjectSwipper projects={projects1} />
                    <h1 className="text-center text-4xl font-bold m-20 text-teal-600">Games</h1>
                    <ProjectSwipper projects={games} />
                </main>
                <DarkModeButton darkMode={darkMode} setDarkMode={setDarkMode} />
                <Footer />
            </div>
        </div>
    );
}
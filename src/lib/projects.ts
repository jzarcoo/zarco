import type { StaticImageData } from "next/image";
import algorithmsData from "../../public/algorithms/algorithms.json";
import softwareData from "../../public/projects/projects.json";
import mlData from "../../public/machinelearning/machinelearning.json";
import gamesData from "../../public/games/games.json";
import { imageFor } from "./projectImages";

export type CategoryKey = "algorithms" | "software" | "ml" | "games";

export interface RawProject {
	img: string;
	title: string;
	description: string;
	tools: string[];
	features?: string[];
	repoLink: string;
	siteLink: string;
}

export interface Project {
	slug: string;
	img: string;
	image: StaticImageData;
	title: string;
	description: string;
	tools: string[];
	features: string[];
	category: CategoryKey;
	categoryLabel: string;
	/** GitHub repository URL, when one exists. */
	repoUrl: string | null;
	/** Live site / demo / presentation URL, when one exists and differs from the repo. */
	liveUrl: string | null;
}

export interface Category {
	key: CategoryKey;
	label: string;
	blurb: string;
}

export const categories: Category[] = [
	{
		key: "algorithms",
		label: "Algorithms & Data Structures",
		blurb: "Graph algorithms, number theory, and the math behind competitive programming.",
	},
	{
		key: "software",
		label: "Software Engineering & Web Development",
		blurb: "Concurrent systems, full-stack apps, and developer tooling.",
	},
	{
		key: "ml",
		label: "Machine Learning & Computer Vision",
		blurb: "Model training, evaluation, and deployment on real data.",
	},
	{
		key: "games",
		label: "Games",
		blurb: "Rendering, game loops, and input handling from the ground up.",
	},
];

function slugify(input: string): string {
	return input
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");
}

function isGitHub(url: string): boolean {
	return url.includes("github.com");
}

function normalize(
	raw: RawProject[],
	category: CategoryKey,
	categoryLabel: string,
): Project[] {
	return raw.map((p) => {
		const urls = Array.from(new Set([p.repoLink, p.siteLink].filter(Boolean)));
		const repoUrl = urls.find(isGitHub) ?? null;
		const liveUrl = urls.find((u) => !isGitHub(u)) ?? null;
		const image = imageFor(p.img);
		if (!image) {
			throw new Error(`No image registered for "${p.img}" (project "${p.title}")`);
		}
		return {
			slug: slugify(p.title),
			img: p.img,
			image,
			title: p.title,
			description: p.description,
			tools: p.tools,
			features: p.features ?? [],
			category,
			categoryLabel,
			repoUrl,
			liveUrl,
		};
	});
}

export const projects: Project[] = [
	...normalize(
		algorithmsData as RawProject[],
		"algorithms",
		"Algorithms & Data Structures",
	),
	...normalize(softwareData as RawProject[], "software", "Software Engineering"),
	...normalize(mlData as RawProject[], "ml", "Machine Learning & Computer Vision"),
	...normalize(gamesData as RawProject[], "games", "Games"),
];

export function getProject(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}

export function projectsByCategory(key: CategoryKey): Project[] {
	return projects.filter((p) => p.category === key);
}

/** Curated subset shown on the home page. */
export const featuredSlugs = [
	"maze-simulator",
	"kanji-ji-app",
	"fake-news-detection",
	"kanji-ji",
	"portal-vaquita",
	"exo-arcade",
];

export const featuredProjects: Project[] = featuredSlugs
	.map((slug) => getProject(slug))
	.filter((p): p is Project => Boolean(p));

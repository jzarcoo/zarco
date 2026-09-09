import type { StaticImageData } from "next/image";

import img2048 from "../../public/2048.webp";
import c6 from "../../public/c6.webp";
import cpmath from "../../public/cpmath.webp";
import elescape from "../../public/elescapedelosnuevecirculos.webp";
import exoarcade from "../../public/exoarcade.webp";
import fakenews from "../../public/fakenewsdetection.webp";
import frametoevent from "../../public/frametoevent.webp";
import frogger from "../../public/frogger.webp";
import juego15 from "../../public/juego15.webp";
import kanjijiapp from "../../public/kanjijiapp.webp";
import kanjiji from "../../public/kanjiji.webp";
import mazesimulator from "../../public/mazesimulator.webp";
import ocr from "../../public/ocr.webp";
import portalVaquita from "../../public/portalVaquita.webp";
import tetris from "../../public/tetris.webp";
import me from "../../public/me.webp";
import githubOctocat from "../../public/github.gif";

/**
 * Static-import map keyed by the `img` filename used in the project JSON.
 * Static imports let Next resolve `basePath` and dimensions correctly in the
 * static export — a bare string `src` would not get the `/zarco` prefix.
 */
const projectImages: Record<string, StaticImageData> = {
	"2048.webp": img2048,
	"c6.webp": c6,
	"cpmath.webp": cpmath,
	"elescapedelosnuevecirculos.webp": elescape,
	"exoarcade.webp": exoarcade,
	"fakenewsdetection.webp": fakenews,
	"frametoevent.webp": frametoevent,
	"frogger.webp": frogger,
	"juego15.webp": juego15,
	"kanjijiapp.webp": kanjijiapp,
	"kanjiji.webp": kanjiji,
	"mazesimulator.webp": mazesimulator,
	"ocr.webp": ocr,
	"portalVaquita.webp": portalVaquita,
	"tetris.webp": tetris,
};

export const meImage = me;
export const githubImage = githubOctocat;

export function imageFor(filename: string): StaticImageData | undefined {
	return projectImages[filename];
}

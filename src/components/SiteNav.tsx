"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
	{ href: "/", label: "HOME" },
	{ href: "/about", label: "ABOUT" },
	{ href: "/projects", label: "PROJECTS" },
	{ href: "/contact", label: "CONTACT" },
] as const;

function isActive(pathname: string, href: string): boolean {
	if (href === "/") return pathname === "/";
	return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteNav() {
	const pathname = usePathname();

	return (
		<nav
			aria-label="Primary"
			className="z-10 mb-10 w-full max-w-3xl md:mb-14"
		>
			<ul className="glass-panel mx-auto flex items-center justify-center gap-5 rounded-full px-5 py-3 text-xs font-semibold tracking-widest text-blue-100 sm:gap-8 sm:text-sm md:gap-14 md:text-base">
				{items.map((item) => {
					const active = isActive(pathname, item.href);
					return (
						<li key={item.href}>
							<Link
								href={item.href}
								data-active={active}
								aria-current={active ? "page" : undefined}
								className="nav-link inline-block py-1"
							>
								{item.label}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}

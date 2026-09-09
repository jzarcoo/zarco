"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
	{ href: "/", label: "Home" },
	{ href: "/about", label: "About" },
	{ href: "/projects", label: "Projects" },
	{ href: "/contact", label: "Contact" },
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
			className="z-20 mb-12 flex w-full max-w-7xl flex-wrap items-center justify-center gap-x-7 gap-y-2 md:mb-16 md:justify-start md:gap-x-10"
		>
			<Link
				href="/"
				aria-label="Antonio Zarco — home"
				className="text-lg font-bold tracking-tight text-accent"
			>
				AZ
			</Link>

			<ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm font-medium sm:gap-x-8">
				{items.map((item) => {
					const active = isActive(pathname, item.href);
					return (
						<li key={item.href}>
							<Link
								href={item.href}
								data-active={active}
								aria-current={active ? "page" : undefined}
								className="nav-link inline-block border-b-2 border-transparent pb-1 data-[active=true]:border-accent"
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

import Link from "next/link";

interface Props {
  href: string;
  text: string;
}

export default function NavbarItem({ href, text }: Props) {
  return (
    <li>
      <Link
        href={href}
        className="text-2xl hover:text-teal-400"
      >
        {text}
      </Link>
    </li>
  );
}

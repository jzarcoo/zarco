interface NavbarItemProps {
    href: string;
    text: string;
}

const NavbarItem = ({ href, text }: NavbarItemProps) => {
    return (
        <li>
            <a href={href} className="text-2xl hover:text-teal-400">
                {text}
            </a>
        </li>
    );
};

export default NavbarItem;
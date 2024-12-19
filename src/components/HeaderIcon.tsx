interface HeaderIconProps {
    	icon: React.ReactNode;
        link: string;
        title: string;
}

const HeaderIcon = ({ icon, link, title }: HeaderIconProps) => {
    return (
        <a
            className="hover:shadow-lg hover:shadow-[teal] hover:scale-105 transform transition-all duration-300"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            title={title}
        >
            {icon}
        </a>
    );
}

export default HeaderIcon;
import {
    AiFillLinkedin,
    AiFillGithub,
    AiFillMail
} from "react-icons/ai";

import HeaderIcon from "./HeaderIcon";
import Image from "next/image";
import me from "../../../public/me.jpg";

const name = "Antonio Zarco";
const title = "Computer Scientist";
const description = "Web developer with a passion for programming, AI, and cybersecurity. Join me down below and let's get cracking!";


const Header = () => {
    return (
        <header id="home">
            <div className="text-center p-6">
                <h2 className="py-2 md:text-6xl text-5xl text-teal-600 font-medium dark:text-teal-400">
                    {name}
                </h2>
                <h3 className="py-2 text-2xl md:text-3xl">
                    {title}
                </h3>
                <p className="text-md leading-8 max-w-xl mx-auto md:text-xl text-gray-800 dark:text-gray-300">
                    {description}
                </p>
                <div className="text-5xl flex justify-center gap-16 py-3 dark:text-gray-300">
                    <HeaderIcon icon={<AiFillLinkedin />} link="https://www.linkedin.com/in/antoniozarco/" title="antoniozarco" />
                    <HeaderIcon icon={<AiFillGithub />} link="https://github.com/jzarcoo" title="jzarcoo" />
                    <HeaderIcon icon={<AiFillMail />} link="mailto:zarco@ieee.org" title="zarco@ieee.org" />
                </div>
                <div className="mx-auto bg-gradient-to-b from-teal-500 rounded-full w-80 h-80 relative overflow-hidden mt-20 md:h-96 md:w-96">
                    <Image src={me} style={{ objectFit: 'cover' }} alt="me" priority />
                </div>
            </div>
        </header>
    );
};

export default Header;
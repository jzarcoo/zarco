import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { 
    Mousewheel, 
    EffectFade 
} from 'swiper/modules';
import { 
    Swiper, 
    SwiperSlide
} from 'swiper/react';
import { 
    FaBootstrap,
    FaCss3,
    FaGithub,
    FaHtml5,
    FaJava,
    FaPaperclip,
    FaPhp,
    FaPython
} from 'react-icons/fa';
import { FaC } from "react-icons/fa6";
import { 
    RiGeminiFill,
    RiJavascriptFill 
} from "react-icons/ri";
import { SiMariadb } from "react-icons/si";
import { Project } from 'next/dist/build/swc/types';


const toolsMap: { [key: string]: React.ReactNode } = {
    Bootstrap : <FaBootstrap size={24} />,
    C : <FaC size={24} />,
    CSS : <FaCss3 size={24} />,
    "Gemini API" : <RiGeminiFill size={24} />,
    HTML : <FaHtml5 size={24} />,
    Java : <FaJava size={24} />,
    JavaScript : <RiJavascriptFill size={24} />,
    MariaDB : <SiMariadb size={24} />,
    PHP : <FaPhp size={24} />,
    Python : <FaPython size={24} />,
};

interface SlideProps {
    img: string;
    title: string;
    description: string;
    tools: string[];
    repoLink: string;
    siteLink: string;
}

const Logos = ({ tools } : { tools: string[] }) => {
    return (
        <div className="flex flex-wrap justify-center gap-2 mt-4">
            {tools.map((tool, index) => (
                <span
                    key={index}
                    className="flex items-center gap-2 bg-teal-600 px-3 py-1 rounded-full text-sm text-gray-100"
                    >
                    {toolsMap[tool] || <span></span>} 
                    {tool}
                </span>
            ))}
        </div>
    );

};

const Slide = ({ img, title, description, tools, repoLink, siteLink } : SlideProps) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="absolute inset-0">
                <Image 
                    src={img}
                    alt={title}
                    layout='fill'
                    objectFit='cover'
                    objectPosition='center'
                    className="blur-md"
                />
                <Image 
                    src={img}
                    alt={title}
                    layout='fill'
                    objectFit='contain'
                    objectPosition='center'
                />
            </div>
            <div className="absolute max-w-sm p-6 bg-gray-100 border border-gray-200 rounded-lg shadow-md shadow-gray-800 dark:shadow-gray-800 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ">
                <h2 className="text-2xl font-bold mb-2 tracking-tight text-teal-500 dark:text-teal-400">{title}</h2>
                <p className="font-normal text-gray-600 dark:text-gray-400">{description}</p>
                <Logos tools={tools} />
                <a href={repoLink} target="_blank" rel="noopener noreferrer" className="absolute top-4 right-4 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                    <FaGithub size={24} />
                </a>
                <a href={siteLink} target="_blank" rel="noopener noreferrer" className="absolute top-4 right-12 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                    <FaPaperclip size={24} />
                </a>
            </div>
        </div>
    );
};

interface ProjectProps {
    // json
    projects: SlideProps[];
}

const Projects = ({ projects } : ProjectProps) => {
    return (
        <Swiper className=' min-h-screen max-h-screen relative'
            direction="vertical"
            slidesPerView={1}
            spaceBetween={0}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            mousewheel={true}
            grabCursor={true}
            touchStartPreventDefault={false}
            modules={[EffectFade, Mousewheel]}
            loop={true}
        >
            {projects.map((project, index) => (
                <SwiperSlide key={index}>
                    <Slide
                        img={project.img}
                        title={project.title}
                        description={project.description}
                        tools={project.tools}
                        repoLink={project.repoLink}
                        siteLink={project.siteLink}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default Projects;

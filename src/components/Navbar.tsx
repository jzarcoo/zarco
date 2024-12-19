import { useState } from 'react';
import { 
	AiOutlineClose, 
	AiOutlineMenu 
} from 'react-icons/ai'; 
import NavbarItem from './NavbarItem';

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false); 

  	return (
    	<div className="relative text-gray-200">
      		<button
        		onClick={() => setIsOpen(!isOpen)}
        		className={`sticky py-6 text-3xl top-6 left-6 z-50 hover:text-teal-400 ${isOpen ? '' : 'text-gray-900 dark:text-gray-200'}`}
      		>
        		<AiOutlineMenu />
      		</button>

      		<div
				className={`fixed top-0 left-0 w-60 h-full p-6 transform ${
				isOpen ? 'translate-x-0' : '-translate-x-full'
				} transition-transform duration-300 ease-in-out z-40
				bg-gradient-to-b from-teal-900 to-transparent`}
			>
        		<button
          			onClick={() => setIsOpen(!isOpen)}
          			className="text-3xl absolute top-6 right-6 hover:text-teal-400"
        		>
          			<AiOutlineClose />
        		</button>

				<ul className="space-y-8 pt-20 px-1">
					<NavbarItem href="/zarco" text="Home" />
				</ul>

				<ul className="space-y-8 pt-10 px-1">
					<NavbarItem href="/zarco/projects" text="Projects" />
				</ul>
      		</div>

			{isOpen && (
				<div
					onClick={() => setIsOpen(!isOpen)}
					className="fixed top-0 left-0 w-full h-full bg-black opacity-60 z-30"
				/>
			)}
		</div>
  );
};

export default Navbar;

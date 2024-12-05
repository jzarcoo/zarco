import { BsFillMoonStarsFill } from "react-icons/bs";

interface DarkModeButtonProps {
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
}

const DarkModeButton = ({ darkMode, setDarkMode } : DarkModeButtonProps) => {
  	return (
        <div className="fixed bottom-0 right-0 m-6">
            <BsFillMoonStarsFill
                onClick={() => setDarkMode(!darkMode)}
                className="cursor-pointer text-2xl"
            />
      </div>
  	);
};

export default DarkModeButton;

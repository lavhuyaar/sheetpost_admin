import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import useTheme from "../hooks/useTheme";

const ThemeToggler = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <button type="button" title={`Change theme (currently ${theme})`} className="cursor-pointer text-2xl p-2 rounded-full hover:bg-background/40 transition" onClick={toggleTheme}>
        {theme === "dark" ? (
          <IoSunnyOutline />
        ) : (
          <IoMoonOutline />
        )}
      </button>
    </>
  );
};

export default ThemeToggler;

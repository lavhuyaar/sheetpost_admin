import { useEffect, useState } from "react";
import { IoMoon, IoSunnyOutline } from "react-icons/io5";

const ThemeToggler = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const selectedTheme = localStorage.getItem("theme");
    if (selectedTheme) {
      document.body.classList.add(selectedTheme);
      setTheme(selectedTheme as ('light' | 'dark'));
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.body.classList.add("dark");
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.add("light");
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === "dark") {
        localStorage.setItem("theme", "light");
        document.body.classList.remove("dark");
        document.body.classList.add("light");
        return "light";
      } else {
        localStorage.setItem("theme", "dark");
        document.body.classList.remove("light");
        document.body.classList.add("dark");
        return "dark";
      }
    });
  };

  return (
    <>
      <button type="button" onClick={toggleTheme}>
        {theme === 'dark'? <IoSunnyOutline className="text-white" size={30}/> : <IoMoon size={30}/>}
      </button>
    </>
  );
};

export default ThemeToggler;

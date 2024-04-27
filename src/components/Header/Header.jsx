import React, { useState, useEffect } from "react";
import moon from "../../assets/icon-moon.svg";
import sun from "../../assets/icon-sun.svg";

const Header = () => {
  const [theme, setTheme] = useState("light");

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="lg:px-40 lg:py-8 sm:py-10 sm:px-4 flex items-center justify-between dark:bg-[#2b3743] bg-white shadow-md font-nunito text-[17px] sticky top-0 z-10">
      <h1 className="font-extrabold">Where in the world?</h1>
      {theme === "dark" ? (
        <span
          className="flex flex-row space-x-2 items-center cursor-pointer transition duration-300 ease-in-out"
          onClick={handleThemeSwitch}
        >
          <img src={sun} alt="sun" />
          <p className="font-semibold">Light Mode</p>
        </span>
      ) : (
        <span
          className="flex flex-row space-x-2 items-center cursor-pointer transition duration-300 ease-in-out"
          onClick={handleThemeSwitch}
        >
          <img src={moon} alt="moon" />
          <p className="font-semibold">Dark Mode</p>
        </span>
      )}
    </div>
  );
};

export default Header;

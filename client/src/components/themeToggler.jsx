import { useState, useEffect } from "react";
import { BsMoon, BsSun } from "react-icons/bs";
export const ThemeToggler = () => {
  const [theme, setTheme] = useState(''); // Initialize state with an empty string

  // Effect to retrieve the current theme from the HTML element
  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    setTheme(currentTheme); // Set the initial state based on the HTML element
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-bs-theme', newTheme);
  };

  return (
    <div>
      <button className="btn btn-primary me-2" onClick={toggleTheme}>
        {theme === "dark" ? <BsMoon className="moonIcon" /> : <BsSun className="sunIcon" />}
      </button>
      <style>{`
        .moonIcon,
        .sunIcon {
          transition: transform 0.3s ease;
        }

        .moonIcon.rotate180 {
          transform: rotate(180deg);
        }

        .sunIcon.rotate180 {
          transform: rotate(180deg);
        }
      `}</style>
    </div>
  );
};

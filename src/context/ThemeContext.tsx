import { type ReactNode, createContext, useEffect, useState } from "react";

type TContext = {
  theme: string;
  toggleTheme: () => void;
};
const context: TContext = {
  theme: "light",
  toggleTheme: () => {
    localStorage.setItem("theme", "light");
  },
};
export const ThemeContext = createContext(context);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) setTheme(theme);
    else setTheme("light");
  }, []);

  const toggleTheme = () => {
    theme === "dark"
      ? localStorage.setItem("theme", "light")
      : localStorage.setItem("theme", "dark");
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {theme && <div className={`theme ${theme}`}>{children}</div>}
    </ThemeContext.Provider>
  );
};

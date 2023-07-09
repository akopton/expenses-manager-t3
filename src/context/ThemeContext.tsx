import { ReactNode, createContext, useEffect, useState } from "react";

type TContext = {
  theme: string | undefined;
  toggleTheme: () => void;
};
const context: TContext = {
  theme: "dark",
  toggleTheme: () => {},
};
export const ThemeContext = createContext(context);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string>();

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

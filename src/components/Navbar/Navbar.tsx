import Link from "next/link";
import { type ReactNode, useContext } from "react";
import { ThemeContext } from "~/context/ThemeContext";

type TLink = {
  id: number;
  name: string;
  href: string;
};

const ToggleThemeBtn = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="cursor-pointer" onClick={toggleTheme}>
      change theme
    </div>
  );
};

export const Navbar = (): ReactNode => {
  const links: TLink[] = [
    { id: 1, name: "Dashboard", href: "/dashboard" },
    { id: 2, name: "Bills", href: "/bills" },
  ];

  return (
    <div>
      <ul>
        {links.map((el: TLink) => (
          <li key={el.id}>
            <Link href={el.href}>{el.name}</Link>
          </li>
        ))}
      </ul>
      <ToggleThemeBtn />
    </div>
  );
};

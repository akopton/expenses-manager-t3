import Link from "next/link";
import { ToggleThemeBtn } from "../ToggleThemeBtn/ToggleThemeBtn";
import styles from "./navbar.module.css";
import { SignInBtn } from "../AuthButtons/SignInBtn";
import { useContext } from "react";
import { ThemeContext } from "~/context/ThemeContext";
import { SignOutBtn } from "../AuthButtons/SignOutBtn";
import { useRouter } from "next/router";

type TLink = {
  id: number;
  name: string;
  href: string;
};

export const Navbar = () => {
  const { theme } = useContext(ThemeContext);
  const { pathname } = useRouter();

  const links: TLink[] = [
    { id: 1, name: "Dashboard", href: "/dashboard" },
    { id: 2, name: "Bills", href: "/bills" },
    { id: 3, name: "Analytics", href: "/analytics" },
  ];

  return (
    <div className={`${styles.container} ${styles[`${theme}`]}`}>
      <div className={styles.themeBtn}>
        <ToggleThemeBtn />
      </div>
      <ul className={styles.linksList}>
        {links.map((el: TLink) => (
          <li
            className={`${styles.link} ${
              pathname.includes(el.href) && styles.active
            }`}
            key={el.id}
          >
            <Link href={el.href}>{el.name}</Link>
          </li>
        ))}
      </ul>
      <SignOutBtn />
    </div>
  );
};

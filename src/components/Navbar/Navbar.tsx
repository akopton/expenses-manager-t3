import { ToggleThemeBtn } from "../ToggleThemeBtn/ToggleThemeBtn";
import { SignOutBtn } from "../AuthButtons/SignOutBtn";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./navbar.module.css";
import { useState, useContext } from "react";
import { ThemeContext } from "~/context/ThemeContext";

type TLink = {
  id: number;
  name: string;
  href: string;
  links?: TLink[];
};

export const Navbar = () => {
  const { pathname } = useRouter();

  const links: TLink[] = [
    { id: 1, name: "Tablica", href: "/dashboard" },
    {
      id: 2,
      name: "Wydatki",
      href: "/bills",
      links: [
        { id: 1, name: "Kategorie", href: "/bills/categories" },
        { id: 2, name: "Zestawy", href: "/bills/sets" },
        { id: 3, name: "Miesiące", href: "/bills/months" },
        { id: 4, name: "Lata", href: "/bills/years" },
      ],
    },
    { id: 3, name: "Analiza", href: "/analytics" },
  ];

  const [showLinks, setShowLinks] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);
  return (
    <div className={styles.container}>
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
            onMouseEnter={() => {
              el.links?.length && setShowLinks(true);
            }}
            onMouseLeave={() => {
              el.links?.length && setShowLinks(false);
            }}
          >
            <Link href={el.href}>{el.name}</Link>
            {el.links && (
              <ul
                className={styles.additionalLinks}
                style={{
                  display: showLinks ? "flex" : "none",
                  background:
                    theme === "dark"
                      ? "var(--primary-bg)"
                      : "var(--primary-font)",
                  boxShadow:
                    theme === "dark"
                      ? "0 5px 4px var(--primary-font)"
                      : "0 5px 4px var(--primary-bg)",
                  border: "none",
                }}
              >
                {el.links.map((link) => {
                  return (
                    <li key={link.id} className={styles.link}>
                      <Link href={link.href}>{link.name}</Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <SignOutBtn />
    </div>
  );
};

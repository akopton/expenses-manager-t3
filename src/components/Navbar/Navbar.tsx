import Link from "next/link";
import { ToggleThemeBtn } from "../ToggleThemeBtn/ToggleThemeBtn";
import { SignOutBtn } from "../AuthButtons/SignOutBtn";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { ThemeContext } from "~/context/ThemeContext";
import styles from "./navbar.module.css";
import { useWindowSize } from "~/hooks/useWindowSize";

type TLink = {
  name: string;
  href: string;
  links?: TLink[];
};

export const Navbar = () => {
  const [showLinks, setShowLinks] = useState<boolean>(false);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);
  const { pathname } = useRouter();
  const { windowSize } = useWindowSize();
  const links: TLink[] = [
    { name: "Tablica", href: "/dashboard" },
    {
      name: "Wydatki",
      href: "/bills",
      links: [
        { name: "Kategorie", href: "/bills/categories" },
        { name: "Zestawy", href: "/bills/sets" },
      ],
    },
    { name: "Analiza", href: "/analytics" },
  ];

  const showMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  const handleMobileMenu = () => {
    if (windowSize.width < 640) {
      setIsMenuVisible(false);
    }
  };

  return (
    <div className={styles.container}>
      {windowSize.width < 640 && (
        <div
          className={styles.navBtns}
          style={{
            background:
              theme === "dark" ? "var(--primary-bg)" : "var(--primary-font)",
          }}
        >
          <div className={styles.themeBtn}>
            <ToggleThemeBtn />
          </div>
          <div className={styles.hamburger} onClick={showMenu}>
            <div className={styles.piece}></div>
            <div className={styles.piece}></div>
            <div className={styles.piece}></div>
          </div>
        </div>
      )}
      {windowSize.width > 640 && (
        <div className={styles.themeBtn}>
          <ToggleThemeBtn />
        </div>
      )}
      <ul
        className={`${styles.linksList as string} ${
          isMenuVisible
            ? (styles.showLinks as string)
            : (styles.hideLinks as string)
        }`}
      >
        {links.map((el: TLink, idx: number) => (
          <li
            className={`${styles.link as string} ${
              pathname.includes(el.href) ? (styles.active as string) : ""
            }
            `}
            key={idx}
            onClick={handleMobileMenu}
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
                }}
              >
                {el.links.map((link: TLink, idx: number) => {
                  return (
                    <li
                      key={idx}
                      className={`${styles.link as string} ${
                        styles.additionalLink as string
                      } ${styles.linkHidden as string}`}
                    >
                      <Link href={link.href}>{link.name}</Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        ))}
        <li>
          <SignOutBtn />
        </li>
      </ul>
    </div>
  );
};

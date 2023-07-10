import { ToggleThemeBtn } from "../ToggleThemeBtn/ToggleThemeBtn";
import { SignOutBtn } from "../AuthButtons/SignOutBtn";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./navbar.module.css";

type TLink = {
  id: number;
  name: string;
  href: string;
};

export const Navbar = () => {
  const { pathname } = useRouter();

  const links: TLink[] = [
    { id: 1, name: "Tablica", href: "/dashboard" },
    { id: 2, name: "Wydatki", href: "/bills" },
    { id: 3, name: "Analiza", href: "/analytics" },
  ];

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
          >
            <Link href={el.href}>{el.name}</Link>
          </li>
        ))}
      </ul>
      <SignOutBtn />
    </div>
  );
};

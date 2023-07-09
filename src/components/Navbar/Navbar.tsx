import Link from "next/link";
import { ToggleThemeBtn } from "../ToggleThemeBtn/ToggleThemeBtn";
import styles from "./navbar.module.css";
import { SignInBtn } from "../SignInBtn/SignInBtn";

type TLink = {
  id: number;
  name: string;
  href: string;
};

export const Navbar = () => {
  const links: TLink[] = [
    { id: 1, name: "Dashboard", href: "/dashboard" },
    { id: 2, name: "Bills", href: "/bills" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.themeBtn}>
        <ToggleThemeBtn />
      </div>
      <ul className={styles.linksList}>
        {links.map((el: TLink) => (
          <li className={styles.link} key={el.id}>
            <Link href={el.href}>{el.name}</Link>
          </li>
        ))}
      </ul>
      <SignInBtn />
    </div>
  );
};

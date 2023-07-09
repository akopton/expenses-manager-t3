import Link from "next/link";
import { ToggleThemeBtn } from "../ToggleThemeBtn/ToggleThemeBtn";

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

import Link from "next/link";
import styles from "./link.module.css";

type THref = {
  pathname: string;
  query: { id: string };
};

type LinkProps = {
  href: string | THref;
  text: string;
};

export const CustomLink = (props: LinkProps) => {
  const { href, text } = props;
  return (
    <Link href={href} className={styles.link}>
      {text}
    </Link>
  );
};

import { useContext } from "react";
import { ThemeContext } from "~/context/ThemeContext";
import { BsMoon, BsSun } from "react-icons/bs";
import styles from "./btn.module.css";
export const ToggleThemeBtn = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      className={styles.switch}
      onClick={toggleTheme}
      style={
        theme === "dark" ? { borderColor: "#fff" } : { borderColor: "#333" }
      }
    >
      <div
        className={styles.floatingPoint}
        style={
          theme === "dark"
            ? { left: "3px", background: "#fff" }
            : {
                left: "calc(100% - 28px)",
                background: "#333",
              }
        }
      />
      <div className={styles.icon}>
        <BsSun />
      </div>
      <div className={styles.icon}>
        <BsMoon />
      </div>
    </button>
  );
};

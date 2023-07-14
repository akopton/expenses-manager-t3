import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColorTransparent: "rgba(88, 14, 246, .4)",
        primaryColor: "rgb(88, 14, 246)",
        primaryFont: "rgb(247, 247, 247)",
        primaryBg: "rgb(26, 28, 34)",
        secondaryBg: "rgb(61, 58, 80)",
      },
      borderRadius: {
        "4xl": "4rem",
      },
      boxShadow: {
        primaryColor:
          "0 0 10px 6px rgb(88, 14, 246), inset 0 0 10px 2px rgb(88, 14, 246)",
      },
    },
  },
  plugins: [],
} satisfies Config;

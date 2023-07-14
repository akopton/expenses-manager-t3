import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        myBounce: {
          "0%": {
            transform: "none",
            animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
          },
          "100%": {
            transform: "none",
            animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
          },
          "50%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
          },
        },
      },
      animation: {
        myAnimation: "myBounce 1s infinite",
      },
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

// 0%, 100% {
//   transform: translateY(-25%);
//   animation-timing-function: cubic-bezier(0.8,0,1,1);
// }
// 50% {
//   transform: none;
//   animation-timing-function: cubic-bezier(0,0,0.2,1);
// }

/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
export default withMT({
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#E6F4FF",
        secondary: "#032B68",
        tertiary: "#0091FF",
      },
      fontFamily: {
        nunito: ["Nunito Sans", "sans-serif"],
      },
      screens: {
        xs: "280px",
        sm: "320px",
        md: "720px",
        lg: "1080px",
        xl: "1440px",
      },
    },
  },
  plugins: [],
});

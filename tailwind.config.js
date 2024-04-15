/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
export default withMT({
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E6F4FF",
        secondary: "#032B68",
        tertiary: "#0091FF",
      },
      screens: {
        sm: "320px",
        md: "720px",
        lg: "1080px",
      },
    },
  },
  plugins: [],
});

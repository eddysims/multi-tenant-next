/** @type {import('tailwindcss').Config} */
const fs = require("fs");
const themeSwapper = require("tailwindcss-theme-swapper");

const themeDir = "./src/themes";
const themes = fs
  .readdirSync(themeDir)
  .filter((file) => file !== "themeType.ts")
  .map((item) => require(themeDir + "/" + item));

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [
    themeSwapper({ themes }),
  ],
};

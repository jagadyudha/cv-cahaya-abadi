module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("@tailwindcss/forms")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#F42E37",
          secondary: "#f6d860",
          accent: "#37cdbe",
          neutral: "#3d4451",
          white: "#fff",
          "base-100": "#ffffff",
        },
      },
    ],
  },
};

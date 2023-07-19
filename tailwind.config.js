/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#13D0A1", // Bright Turquoise (swapped with secondary)
          secondary: "#5D3FD3", // Deep Purple (swapped with primary)
          accent: "#FFC107", // Sunshine Yellow
          neutral: "#F5F5FA", // Off-White for primary text (swapped with base-100)
          "base-100": "#1D1D2C", // Off-Black for background (swapped with neutral)
          info: "#30a9d9", // Aqua Blue for informational messages
          success: "#2de1a2", // Lighter shade of turquoise for success messages
          warning: "#fbe160", // Muted Yellow for warning messages
          error: "#e4322f", // Strong Red for error messages
        },
      },
    ],
  },
  // daisyui: {
  //   themes: ["autumn"],
  // },
  plugins: [require("daisyui")],
};

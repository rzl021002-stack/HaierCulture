/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: "#0f172a",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        glow: "glow 2s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
          },
          "50%": {
            boxShadow: "0 0 30px rgba(59, 130, 246, 0.8)",
          },
        },
        fadeInUp: {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "pulse-glow": {
          "0%, 100%": {
            opacity: "0.8",
          },
          "50%": {
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [],
};

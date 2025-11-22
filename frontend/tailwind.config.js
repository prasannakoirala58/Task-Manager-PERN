module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#9CA3AF", // soft neutral gray
        "primary-dark": "#6B7280", // darker gray for hover
      },
      animation: {
        loader: "loader 1s linear infinite",
      },
      keyframes: {
        loader: {
          "0%": { transform: "rotate(0) scale(1)" },
          "50%": { transform: "rotate(180deg) scale(1.5)" },
          "100%": { transform: "rotate(360deg) scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

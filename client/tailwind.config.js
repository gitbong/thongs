module.exports = {
  content: ["./**/*.{js,jsx,ts,tsx}", "./index.html"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {},
  },
  // variants: {
  //   extend: {},
  // },
  variants: {
    backgroundColor: [
      "responsive",
      "group-hover",
      "first",
      "last",
      "odd",
      "even",
      "hover",
      "focus",
      "active",
      "visited",
      "disabled",
    ],
  },
  plugins: [],
};

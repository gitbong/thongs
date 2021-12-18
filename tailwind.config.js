module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./src/client/index.html"],
  darkMode: false, // or 'media' or 'class'
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

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: { custom: ["var(--font-dmSans)", "var(--font-openSans)"] },
      fontSize: {
        custom700_34: [
          "34px",
          {
            lineHeight: "46px",
            fontWeight: "700",
          },
        ],
        custom700_24: [
          "24px",
          {
            lineHeight: "35px",
            fontWeight: "700",
          },
        ],
        custom700_18: [
          "18px",
          {
            lineHeight: "20px",
            fontWeight: "700",
          },
        ],
        custom600_30: [
          "30px",
          {
            fontWeight: "600",
            lineHeight: "40px",
          },
        ],
        custom600_24: [
          "24px",
          {
            fontWeight: "600",
          },
        ],
        custom600_16: [
          "16px",
          {
            lineHeight: "23px",
            fontWeight: "600",
          },
        ],
        custom400_16: [
          "16px",
          {
            fontWeight: "400",
          },
        ],
        custom400_14: [
          "14px",
          {
            fontWeight: "400",
          },
        ],
        custom500_18: [
          "18px",
          {
            lineHeight: "20px",
            fontWeight: "500",
          },
        ],
        custom400_18: [
          "18px",
          {
            lineHeight: "30px",
            fontWeight: "400",
          },
        ],
        custom400_16: [
          "16px",
          {
            lineHeight: "23px",
            fontWeight: "400",
          },
        ],
      },
      width: { custom: "698px" },
      colors: {
        custom_neutral_300: "#EFF0F6",
        custom_neutral_400: "#D9DBE9",
        custom_neutral_800: "#170F49",
        custom_neutral_600: "#6F6C90",
        custom_primary_color: "#4A3AFF",
        custom_primary_color_2: "#962DFF",
        custom_pink: "#FF5480",
      },
    },
  },
  plugins: [],
};

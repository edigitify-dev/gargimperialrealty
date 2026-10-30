import localFont from "next/font/local";

export const bodoniModa = localFont({
  src: [
    {
      path: "../../public/fonts/bodoni-moda-variable.ttf",
      weight: "400 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/bodoni-moda-italic.ttf",
      weight: "400 900",
      style: "italic",
    },
  ],
  variable: "--font-bodoni-moda",
  display: "swap",
  adjustFontFallback: "Times New Roman",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const manrope = localFont({
  src: "../../public/fonts/manrope-variable.ttf",
  weight: "200 800",
  style: "normal",
  variable: "--font-manrope",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

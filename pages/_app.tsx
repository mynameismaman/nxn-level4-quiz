// These styles apply to every route in the application
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${openSans.className} bg-[#F9F9FB]`}>
      <Component {...pageProps} />
    </main>
  );
}

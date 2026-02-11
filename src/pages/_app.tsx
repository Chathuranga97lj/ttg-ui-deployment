import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/pages/components/shared/Navbar";
import Footer from "@/pages/components/shared/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

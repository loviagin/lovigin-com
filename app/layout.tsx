import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LOVIGIN – IT-Developer Company",
  description: "Lovigin LTD is a software development company that provides custom software solutions to businesses of all sizes.",
  robots: {
    index: true,
    follow: true,
    noimageindex: false,
    noarchive: false,
  },
  openGraph: {
    title: "LOVIGIN – IT-Developer Company",
    description: "Lovigin LTD is a software development company that provides custom software solutions to businesses of all sizes.",
    images: "/favicon.ico",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

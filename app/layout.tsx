import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { AuthProvider } from '@/components/AuthProvider';
import Script from "next/script";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable}`}>
      <body>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-VB02GRN07D"
          strategy="afterInteractive"
        ></Script>
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', 'G-VB02GRN07D', { send_page_view: true });
            gtag('config', 'AW-17637165205');
          `}
        </Script>
      </body>
    </html>
  );
}

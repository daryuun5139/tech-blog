import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Daryun's Tech Blog",
    template: "%s | Daryun's Tech Blog",
  },
  description: "This Blog is created by Daryun",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="`${inter.className}` dark:bg-darkgrey">
        <Providers>
          <div className="mx-auto flex w-[550px] flex-col sm:container lg:w-[950px]">
            <Header />
            <div className="min-h-[1200px]">{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

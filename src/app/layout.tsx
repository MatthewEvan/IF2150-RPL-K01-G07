import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Footer from "@/components/layout/Footer";
import NavbarPublik from "@/components/layout/NavbarPublik";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PahamHukum",
  description: "Panduan langkah awal untuk masalah hukum sehari-hari.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <NavbarPublik />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

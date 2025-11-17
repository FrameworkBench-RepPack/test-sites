import type { Metadata } from "next";
import Link from "next/link";
import Links from "@/components/Links";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Test site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body>{children}</body>
      </html>
      <Footer />
    </>
  );
}

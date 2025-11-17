import type { Metadata } from "next";
import Link from "next/link";
import Links from "@/components/Links";
import "./globals.css";

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
      <footer>
        <div id="footer-content">
          <Link href={"/"} id="footer-logo">
            Test site
          </Link>
          <ul>
            <Links />
          </ul>
          <blockquote>
            Sed blandit est nec quam vulputate, id vulputate ipsum scelerisque.
            Etiam in elit ornare, fermentum nisl vel, gravida ipsum.
          </blockquote>
        </div>
      </footer>
    </>
  );
}

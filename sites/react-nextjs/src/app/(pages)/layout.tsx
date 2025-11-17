import Link from "next/link";
import s from "./layout.module.css";
import Links from "@/components/Links";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className={s.header}>
        <nav>
          <ul>
            <li>
              <Link href={"/"}>
                <img
                  id={`icon`}
                  className={s.icon}
                  src={"/icon.svg"}
                  alt="Front page"
                  loading="lazy"
                />
              </Link>
            </li>
            <Links />
          </ul>
        </nav>
      </header>
      <main className={`page-width ${s.main}`}>{children}</main>
    </>
  );
}

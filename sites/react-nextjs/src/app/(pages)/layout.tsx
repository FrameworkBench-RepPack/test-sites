import Header from "@/components/header/Header";
import s from "./layout.module.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className={`page-width ${s.main}`}>{children}</main>
    </>
  );
}

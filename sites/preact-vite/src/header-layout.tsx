import { ComponentChildren } from "preact";
import Header from "@/components/header/Header";
import s from "./header-layout.module.css";

interface Props {
  children: ComponentChildren;
}

export default function HeaderLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main className={`page-width ${s.main}`}>{children}</main>
    </>
  );
}

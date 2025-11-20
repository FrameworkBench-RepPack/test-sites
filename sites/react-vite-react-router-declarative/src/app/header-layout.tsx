import { Outlet } from "react-router";
import Header from "@/components/header/Header";
import s from "./header-layout.module.css";

export default function HeaderLayout() {
  return (
    <>
      <Header />
      <main className={`page-width ${s.main}`}>
        <Outlet />
      </main>
    </>
  );
}

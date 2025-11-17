"use client";
import { ReactNode, useState } from "react";
import s from "./Details.module.css";

interface Props {
  summary: string;
  children: ReactNode;
}

export default function Details({ summary, children }: Props) {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((o) => !o);

  return (
    <div className={`${s.details} ${open ? s.open : ""}`}>
      <button className={s.summary} onClick={toggleOpen}>
        {summary}
      </button>
      {open && <div className={s.contents}>{children}</div>}
    </div>
  );
}

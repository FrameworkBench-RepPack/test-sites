import { type ReactNode, useCallback, useState } from "react";
import s from "./Details.module.css";

interface Props {
  summary: string;
  children: ReactNode;
}

export default function Details({ summary, children }: Props) {
  const [open, setOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setOpen((o) => !o);
  }, []);

  return (
    <div className={`details ${s.details} ${open ? s.open : ""}`}>
      <button className={`summary ${s.summary}`} onClick={toggleOpen}>
        {summary}
      </button>
      {open && <div className={`contents ${s.contents}`}>{children}</div>}
    </div>
  );
}

import { useSignal } from "@preact/signals";
import type { ComponentChildren } from "preact";
import s from "./Details.module.css";

interface Props {
  summary: string;
  children: ComponentChildren;
}

export default function Details({ summary, children }: Props) {
  const open = useSignal(false);
  const toggleOpen = () => {
    open.value = !open.value;
  };
  return (
    <div className={`details ${s.details} ${open.value ? s.open : ""}`}>
      <button className={`summary ${s.summary}`} onClick={toggleOpen}>
        {summary}
      </button>
      {open.value && <div className={`contents ${s.contents}`}>{children}</div>}
    </div>
  );
}

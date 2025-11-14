import { type JSX, createSignal, Show } from "solid-js";
import styles from "./Details.module.css";

export default function Details(props: {
  summary: string;
  children: JSX.Element;
}) {
  const [open, setOpen] = createSignal(false);

  return (
    <div class={`details ${styles.details}`}>
      <button
        class={`summary ${styles.summary} ${open() ? styles["open-summary"] : ""}`}
        onclick={() => setOpen((previous) => !previous)}
      >
        {props.summary}
      </button>
      <Show when={open()}>
        <div class={`contents ${styles.contents}`}>{props.children}</div>
      </Show>
    </div>
  );
}

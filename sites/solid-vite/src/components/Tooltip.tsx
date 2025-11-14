import { type JSX, createSignal, onCleanup, onMount, Show } from "solid-js";
import { isServer } from "solid-js/web";
import styles from "./Tooltip.module.css";

export default function Tooltip(props: { children: JSX.Element }) {
  const [open, setOpen] = createSignal(false);
  let tooltipRef: HTMLButtonElement | undefined;
  let contentsRef: HTMLSpanElement | undefined;

  function handleLightDismiss(event: MouseEvent) {
    const target = event.target as Node;
    if (
      contentsRef &&
      target !== tooltipRef &&
      target !== contentsRef &&
      !contentsRef.contains(target)
    ) {
      setOpen(false);
    }
  }

  onMount(() => {
    if (!isServer) document.addEventListener("click", handleLightDismiss);
  });

  onCleanup(() => {
    if (!isServer) document.removeEventListener("click", handleLightDismiss);
  });

  return (
    <>
      {" "}
      <button
        class={`tooltip ${styles.tooltip}`}
        onclick={() => setOpen((previous) => !previous)}
        ref={tooltipRef}
      >
        ?
      </button>
      <Show when={open()}>
        <span class={`contents ${styles.contents}`} ref={contentsRef}>
          {props.children}
        </span>
      </Show>{" "}
    </>
  );
}

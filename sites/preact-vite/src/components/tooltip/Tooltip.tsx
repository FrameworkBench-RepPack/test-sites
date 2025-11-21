import { RefObject, ComponentChildren } from "preact";
import { effect, useSignal } from "@preact/signals";
import { useSignalRef } from "@preact/signals/utils";
import s from "./Tooltip.module.css";

interface Props {
  children: ComponentChildren;
}

export default function Tooltip({ children }: Props) {
  const open = useSignal(false);

  const tooltip: RefObject<HTMLButtonElement | null> = useSignalRef(null);
  const contents: RefObject<HTMLSpanElement | null> = useSignalRef(null);

  effect(() => {
    function handleLightDismiss(event: MouseEvent) {
      if (tooltip.current === null || contents.current === null) return;

      const target = event.target as Node;
      if (
        target !== tooltip.current &&
        target !== contents.current &&
        !contents.current?.contains(target)
      ) {
        open.value = false;
      }
    }

    // Attach the event listener to the document
    globalThis.document?.addEventListener("click", handleLightDismiss);

    // Cleanup on unmount
    return () => {
      globalThis.document?.removeEventListener("click", handleLightDismiss);
    };
  });

  return (
    <>
      {" "}
      <button
        className={`tooltip ${s.tooltip}`}
        onClick={(e) => {
          open.value = !open.value;
        }}
        ref={tooltip}
      >
        ?
      </button>
      {open.value && (
        <span className={`contents ${s.contents}`} ref={contents}>
          {children}
        </span>
      )}{" "}
    </>
  );
}

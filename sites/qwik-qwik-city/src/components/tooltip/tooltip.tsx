import {
  $,
  component$,
  Slot,
  useOnDocument,
  useSignal,
} from "@builder.io/qwik";
import styles from "./tooltip.module.css";

export default component$(() => {
  const open = useSignal(false);
  const tooltipRef = useSignal<HTMLElement | undefined>();
  const contentsRef = useSignal<HTMLElement | undefined>(undefined);

  useOnDocument(
    "click",
    $((event: MouseEvent) => {
      const target = event.target as Node;
      if (
        contentsRef.value &&
        target !== tooltipRef.value &&
        target !== contentsRef.value &&
        !contentsRef.value.contains(target)
      ) {
        open.value = false;
      }
    }),
  );

  return (
    <>
      {" "}
      <button
        class={["tooltip", styles.tooltip]}
        onClick$={() => (open.value = !open.value)}
        ref={tooltipRef}
      >
        ?
      </button>
      {open.value && (
        <span class={["contents", styles.contents]} ref={contentsRef}>
          <Slot />
        </span>
      )}{" "}
    </>
  );
});

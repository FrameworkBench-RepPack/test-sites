import { component$, Slot, useSignal } from "@builder.io/qwik";
import styles from "./details.module.css";

interface ItemProps {
  summary: string;
}

export default component$<ItemProps>(({ summary }) => {
  const open = useSignal(false);

  return (
    <div class={["details", styles.details]}>
      <button
        class={[
          "summary",
          styles.summary,
          open.value ? styles["open-summary"] : "",
        ]}
        onClick$={() => (open.value = !open.value)}
      >
        {summary}
      </button>
      {open.value && (
        <div class={["contents", styles.contents]}>
          <Slot />
        </div>
      )}
    </div>
  );
});

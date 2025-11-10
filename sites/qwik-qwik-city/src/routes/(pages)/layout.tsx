import { component$, Slot } from "@builder.io/qwik";
import Header from "~/components/header/header";
import styles from "./layout.module.css";

export default component$(() => {
  return (
    <>
      <Header />
      <main class={["page-width", styles.main]}>
        <Slot />
      </main>
    </>
  );
});

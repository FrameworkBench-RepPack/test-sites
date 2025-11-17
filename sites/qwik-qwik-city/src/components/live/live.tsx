import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import liveData from "~/assets/liveData.json" with { import: "json" };
import styles from "./live.module.css";

const INTERVAL = 1000;

export default component$(() => {
  const index = useSignal(0);

  useVisibleTask$(() => {
    let timeoutId: number | NodeJS.Timeout;
    function stepData() {
      index.value = (index.value + 1) % (liveData.length - 1);
      timeoutId = setTimeout(stepData, INTERVAL);
    }
    stepData();
    return () => {
      clearTimeout(timeoutId);
    };
  });

  return (
    <table id="live-data" class={[styles["live-data"]]}>
      <tbody>
        <tr>
          <td>{liveData?.[index.value]?.[0]}</td>
          <td>{liveData?.[index.value]?.[1]}</td>
          <td>{liveData?.[index.value]?.[2]}</td>
        </tr>
      </tbody>
    </table>
  );
});

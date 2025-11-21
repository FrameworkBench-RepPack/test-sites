import liveData from "../assets/liveData.json" with { type: "json" };
import { createSignal, onCleanup, onMount } from "solid-js";
import styles from "./Live.module.css";

const INTERVAL = 800;

export default function Live() {
  const [index, setIndex] = createSignal(0);
  let timeoutId: number | NodeJS.Timeout;
  function stepData() {
    setIndex((index() + 1) % (liveData.length - 1));
    timeoutId = setTimeout(stepData, INTERVAL);
  }

  onMount(() => {
    stepData();
  });
  onCleanup(() => {
    clearTimeout(timeoutId);
  });

  return (
    <table id="live-data" class={styles["live-data"]}>
      <tbody>
        <tr>
          <td>{liveData?.[index()]?.[0]}</td>
          <td>{liveData?.[index()]?.[1]}</td>
          <td>{liveData?.[index()]?.[2]}</td>
        </tr>
      </tbody>
    </table>
  );
}

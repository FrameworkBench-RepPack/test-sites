import liveData from "../../assets/liveData.json" with { type: "json" };
import { computed, useSignal } from "@preact/signals";
import s from "./Live.module.css";

export default function Live() {
  const INTERVAL = 1000 as const;

  const index = useSignal(0);

  computed(() => {
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
    <table id="live-data" className={s.liveData}>
      <tbody>
        <tr>
          <td>{liveData?.[index.value]?.[0]}</td>
          <td>{liveData?.[index.value]?.[1]}</td>
          <td>{liveData?.[index.value]?.[2]}</td>
        </tr>
      </tbody>
    </table>
  );
}

<script lang="ts">
  import liveData from "../assets/liveData.json" with { type: "json" };
  import { onDestroy, onMount } from "svelte";

  const INTERVAL = 800;

  let index = $state(0);
  let timeoutId: number | NodeJS.Timeout;
  function stepData() {
    index = (index + 1) % liveData.length;
    timeoutId = setTimeout(stepData, INTERVAL);
  }

  onMount(() => {
    stepData();
  });
  onDestroy(() => {
    clearTimeout(timeoutId);
  });
</script>

<table id="live-data">
  <tbody>
    <tr>
      <td>{liveData?.[index]?.[0]}</td>
      <td>{liveData?.[index]?.[1]}</td>
      <td>{liveData?.[index]?.[2]}</td>
    </tr>
  </tbody>
</table>

<style>
  #live-data {
    width: 100%;
    text-align: center;
    font-size: 2em;

    & td {
      height: 3.5em;
      border: 0.08em solid black;
      background-color: var(--color-secondary);
    }
  }
</style>

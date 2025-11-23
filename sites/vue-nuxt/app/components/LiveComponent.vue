<script setup lang="ts">
import liveData from "~/assets/liveData.json" with { type: "json" };
import { onMounted, onBeforeUnmount } from "vue";

const INTERVAL = 800;

const index = ref(0);
let timeoutId: number | NodeJS.Timeout;
function stepData() {
  index.value = (index.value + 1) % (liveData.length);
  timeoutId = setTimeout(stepData, INTERVAL);
}

onMounted(() => {
  stepData();
});
onBeforeUnmount(() => {
  clearTimeout(timeoutId);
});
</script>

<template>
  <table id="live-data">
    <tbody>
      <tr>
        <td>{{ liveData?.[index]?.[0] }}</td>
        <td>{{ liveData?.[index]?.[1] }}</td>
        <td>{{ liveData?.[index]?.[2] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
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

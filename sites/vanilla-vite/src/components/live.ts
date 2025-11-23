import liveData from "../assets/liveData.json" with { type: "json" };

const INTERVAL = 800;

const dataElements = document.querySelectorAll(
  "#live-data td",
) as NodeListOf<HTMLElement>;
let index = 0;
function stepData() {
  index = (index + 1) % (liveData.length);
  for (let elementIndex = 0; elementIndex < 3; elementIndex++) {
    dataElements[elementIndex].innerText = String(
      liveData?.[index]?.[elementIndex],
    );
  }
  setTimeout(stepData, INTERVAL);
}
stepData();

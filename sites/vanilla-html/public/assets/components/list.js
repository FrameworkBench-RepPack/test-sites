const MAX_SLACK_MS = 700;

const form = document.querySelector("#list > .controls > form");
const tbody = document.querySelector("#list > .data tbody");
const table = tbody.parentElement;

const noDataMessage = document.createElement("p");
noDataMessage.classList.add("no-data-message");
noDataMessage.innerText = "No entries matched the filter settings.";

const rows = [...tbody.querySelectorAll("tr")].map((rowElement) => {
  const cells = rowElement.querySelectorAll("td");
  const name = cells[0].innerText;
  const age = Number(cells[1].innerText);
  const category = Number(cells[2].dataset.category);
  return {
    element: rowElement,
    name,
    age,
    category,
  };
});

let idleCallbackId;
form.addEventListener("input", () => {
  handleInput();
});
handleInput();
function handleInput() {
  cancelIdleCallback(idleCallbackId);
  idleCallbackId = requestIdleCallback(filterList, {
    timeout: MAX_SLACK_MS,
  });
}

function filterList() {
  const data = new FormData(form);
  const sortOption = String(data.get("sort"));
  const ageFrom = Number(data.get("age-from"));
  const ageTo = Number(data.get("age-to"));
  const categories = data.getAll("category").map((entry) => Number(entry));
  let noData = true;
  const sortedRows = rows.sort((a, b) => {
    switch (sortOption) {
      case "name": {
        return a.name.localeCompare(b.name);
      }
      case "age": {
        return a.age - b.age;
      }
      case "category": {
        return a.category - b.category;
      }
      default: {
        throw TypeError("Unknown option");
      }
    }
  });
  tbody.remove();
  for (const row of sortedRows) {
    const hidden =
      row.age < ageFrom ||
      row.age > ageTo ||
      !categories.includes(row.category);
    row.element.remove();
    if (!hidden) {
      tbody.appendChild(row.element);
      noData = false;
    }
  }
  noDataMessage.remove();
  if (noData) {
    table.insertAdjacentElement("afterend", noDataMessage);
  } else {
    table.appendChild(tbody);
  }
}

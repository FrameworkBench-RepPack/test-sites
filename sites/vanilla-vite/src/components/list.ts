const MAX_SLACK_MS = 700;

const form = document.querySelector(
  "#list > .controls > form",
) as HTMLFormElement;
const tbody = document.querySelector(
  "#list > .data tbody",
) as HTMLTableSectionElement;
const noDataMessage = document.querySelector(
  "#list > .data .no-data-message",
) as HTMLParagraphElement;

const rows = [...tbody.querySelectorAll("tr")].map((rowElement) => {
  const cells = rowElement.querySelectorAll(
    "td",
  ) as NodeListOf<HTMLTableCellElement>;
  const name = cells[0].innerText as string;
  const age = Number(cells[1].innerText);
  const category = Number(cells[2].dataset.category);
  return {
    element: rowElement,
    name,
    age,
    category,
  };
});

let idleCallbackId: number;
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
  rows
    .sort((a, b) => {
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
    })
    .forEach((row) => {
      tbody.appendChild(tbody.removeChild(row.element));
      const hidden =
        row.age < ageFrom ||
        row.age > ageTo ||
        !categories.includes(row.category);
      row.element.hidden = hidden;
      if (!hidden) noData = false;
    });
  noDataMessage.hidden = !noData;
}

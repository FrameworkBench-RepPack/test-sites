import {
  type Accessor,
  type Signal,
  createMemo,
  createRenderEffect,
  createSignal,
  For,
  Show,
} from "solid-js";
import { listCategories } from "~/assets/listCategory";
import styles from "./List.module.css";

function numberInputModel(
  element: HTMLInputElement,
  value: Accessor<Signal<number>>,
) {
  const [field, setField] = value();
  createRenderEffect(() => (element.value = String(field())));
  element.addEventListener("input", ({ target }: Event) =>
    setField(Number((target as HTMLInputElement).value)),
  );
}

function stringInputModel(
  element: HTMLInputElement | HTMLSelectElement,
  value: Accessor<Signal<string>>,
) {
  const [field, setField] = value();
  createRenderEffect(() => (element.value = field()));
  element.addEventListener("input", ({ target }: Event) =>
    setField((target as HTMLInputElement).value),
  );
}

function numberCheckboxesModel(
  element: HTMLInputElement,
  values: Accessor<Signal<number[]>>,
) {
  const [items, setItems] = values();
  const value = Number(element.value);
  createRenderEffect(() => {
    element.checked = items().includes(value);
  });
  element.addEventListener("input", () => {
    setItems((prev) =>
      element.checked ? [...prev, value] : prev.filter((i) => i !== value),
    );
  });
}

declare module "solid-js" {
  namespace JSX {
    interface DirectiveFunctions {
      numberInputModel: typeof numberInputModel;
      stringInputModel: typeof stringInputModel;
      numberCheckboxesModel: typeof numberCheckboxesModel;
    }
  }
}

const sortOptions = new Map<string, string>([
  ["name", "Name"],
  ["age", "Age"],
  ["category", "Category"],
]);

export default function List(props: {
  listData: { name: string; age: number; category: number }[];
  sticky?: boolean;
}) {
  const [sortOption, setSortOption] = createSignal("name");

  const [ageFrom, setAgeFrom] = createSignal(0);
  const [ageTo, setAgeTo] = createSignal(100);

  const [categories, setCategories] = createSignal<number[]>([
    ...listCategories.keys(),
  ]);

  const filteredList = createMemo(() =>
    props.listData
      .filter(
        (candidate) =>
          candidate.age >= ageFrom() &&
          candidate.age <= ageTo() &&
          categories().includes(candidate.category),
      )
      .sort((a, b) => {
        switch (sortOption()) {
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
      }),
  );

  return (
    <div id="list" class={styles.list}>
      <div class="controls">
        <form
          class={`${styles.form} ${props.sticky ? styles["sticky-form"] : ""}`}
        >
          <label>
            {"Sort by: "}
            <select
              name="sort"
              value="name"
              use:stringInputModel={[sortOption, setSortOption]}
            >
              <For each={[...sortOptions.entries()]}>
                {([key, name]) => <option value={key}>{name}</option>}
              </For>
            </select>
          </label>
          <fieldset>
            <legend> Age </legend>
            <label>
              {"From: "}
              <input
                type="number"
                name="age-from"
                value="0"
                use:numberInputModel={[ageFrom, setAgeFrom]}
                min="0"
                max="100"
                step="1"
              />
            </label>{" "}
            <label>
              {"To: "}
              <input
                type="number"
                name="age-to"
                value="100"
                use:numberInputModel={[ageTo, setAgeTo]}
                min="0"
                max="100"
                step="1"
              />
            </label>
          </fieldset>
          <fieldset>
            <legend> Categories </legend>
            <For each={[...listCategories.entries()]}>
              {([key, name]) => (
                <label>
                  <input
                    type="checkbox"
                    name="category"
                    value={key}
                    use:numberCheckboxesModel={[categories, setCategories]}
                  />
                  {name}
                </label>
              )}
            </For>
          </fieldset>
        </form>
      </div>
      <div class="data">
        <table
          class={`${styles.table} ${props.sticky ? styles["sticky-table"] : ""}`}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            <For each={filteredList()}>
              {(item) => (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{listCategories.get(item.category)}</td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
        <Show when={filteredList().length === 0}>
          <p class={`no-data-message ${styles["no-data-message"]}`}>
            No entries matched the filter settings.
          </p>
        </Show>
      </div>
    </div>
  );
}

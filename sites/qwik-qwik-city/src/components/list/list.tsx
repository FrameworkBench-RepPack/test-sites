import {
  component$,
  useComputed$,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import { listCategories } from "~/assets/listCategory";
import styles from "./list.module.css";

interface ItemProps {
  listData: { name: string; age: number; category: number }[];
  sticky: boolean;
}

const sortOptions = new Map<string, string>([
  ["name", "Name"],
  ["age", "Age"],
  ["category", "Category"],
]);

export default component$<ItemProps>(({ listData, sticky }) => {
  const sortOption = useSignal("name");

  const ageFrom = useSignal(0);
  const ageTo = useSignal(100);

  const categories = useStore<boolean[]>([
    ...listCategories.keys().reduce<boolean[]>((acc, value) => {
      acc[value] = true;
      return acc;
    }, []),
  ]);

  const filteredList = useComputed$(() => {
    return listData
      .filter(
        (candidate) =>
          candidate.age >= ageFrom.value &&
          candidate.age <= ageTo.value &&
          categories[candidate.category],
      )
      .sort((a, b) => {
        switch (sortOption.value) {
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
  });

  return (
    <>
      <div id="list" class={[styles.list]}>
        <div class="controls">
          <form class={[styles.form, sticky && styles["sticky-form"]]}>
            <label>
              {"Sort by: "}
              <select name="sort" bind:value={sortOption}>
                {[
                  ...sortOptions.entries().map(([key, name]) => (
                    <option key={key} value={key}>
                      {name}
                    </option>
                  )),
                ]}
              </select>
            </label>
            <fieldset>
              <legend> Age </legend>
              <label>
                {"From: "}
                <input
                  type="number"
                  name="age-from"
                  bind:value={ageFrom}
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
                  bind:value={ageTo}
                  min="0"
                  max="100"
                  step="1"
                />
              </label>
            </fieldset>
            <fieldset>
              <legend> Categories </legend>
              {[
                ...listCategories.entries().map(([key, name]) => (
                  <label key={key}>
                    <input
                      type="checkbox"
                      name="category"
                      value={key}
                      checked={categories[key]}
                      onInput$={(_: Event, element: HTMLInputElement) => {
                        categories[key] = element.checked;
                      }}
                    />
                    {" " + name}
                  </label>
                )),
              ]}
            </fieldset>
          </form>
        </div>
        <div class="data">
          <table class={[styles.table, sticky && styles["sticky-table"]]}>
            <thead>
              <tr>
                <th> Name </th> <th> Age </th> <th> Category </th>
              </tr>
            </thead>
            <tbody>
              {[
                ...filteredList.value.map((item) => (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{listCategories.get(item.category)}</td>
                  </tr>
                )),
              ]}
            </tbody>
          </table>
          {filteredList.value.length === 0 && (
            <p class={["no-data-message", styles["no-data-message"]]}>
              No entries matched the filter settings.
            </p>
          )}
        </div>
      </div>
    </>
  );
});

import { useSignal, computed } from "@preact/signals";
import { For } from "@preact/signals/utils";
import { listCategories } from "../../assets/listCategory";
import s from "./List.module.css";

interface Props {
  listData: { name: string; age: number; category: number }[];
  sticky: boolean;
}

export default function List({ listData, sticky }: Props) {
  const sortOptions = new Map<string, string>([
    ["name", "Name"],
    ["age", "Age"],
    ["category", "Category"],
  ]);

  const sortOption = useSignal("name");
  const ageFrom = useSignal(0);
  const ageTo = useSignal(100);

  const categories = useSignal([...listCategories.keys()]);

  const filteredList = computed(() => {
    return listData
      .filter(
        (candidate) =>
          candidate.age >= ageFrom.value &&
          candidate.age <= ageTo.value &&
          categories.value.includes(candidate.category),
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

  const handleCategoryChange = (key: number, checked: boolean) => {
    categories.value = checked
      ? [...categories.value, key]
      : categories.value.filter((item) => item !== key);
  };

  return (
    <div id={`list`} className={`${s.list} ${sticky ? s.sticky : ""}`}>
      <div className={`controls  ${s.controls}`}>
        <form>
          <label>
            Sort by:{" "}
            <select
              name="sort"
              value={sortOption}
              onInput={(e) => (sortOption.value = e.currentTarget.value)}
            >
              {Array.from(sortOptions).map(([key, name]) => {
                return (
                  <option key={key} value={key}>
                    {name}
                  </option>
                );
              })}
            </select>
          </label>
          <fieldset>
            <legend> Age </legend>
            <label>
              From:{" "}
              <input
                type="number"
                name="age-from"
                min="0"
                max="100"
                step="1"
                value={ageFrom}
                onInput={(e) => {
                  ageFrom.value = Number(e.currentTarget.value);
                }}
              />{" "}
            </label>
            <label>
              To:{" "}
              <input
                type="number"
                name="age-to"
                min="0"
                max="100"
                step="1"
                value={ageTo}
                onInput={(e) => {
                  ageTo.value = Number(e.currentTarget.value);
                }}
              />
            </label>
          </fieldset>
          <fieldset>
            <legend> Categories </legend>
            {Array.from(listCategories).map(([key, name]) => (
              <label key={key}>
                <input
                  type="checkbox"
                  name="category"
                  checked={categories.value.includes(key)}
                  onInput={(e) =>
                    handleCategoryChange(key, e.currentTarget.checked)
                  }
                />{" "}
                {name}
              </label>
            ))}
          </fieldset>
        </form>
      </div>
      <div className={`data ${s.data}`}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            <For each={filteredList} fallback={<p>No items</p>}>
              {(item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{listCategories.get(item.category)}</td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
        {filteredList.value.length === 0 && (
          <p className={`no-data-message ${s.noDataMessage}`}>
            No entries matched the filter settings.
          </p>
        )}
      </div>
    </div>
  );
}

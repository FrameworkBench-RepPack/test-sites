"use client";
import { listCategories } from "@/assets/listCategory";
import s from "./List.module.css";
import { useMemo, useState } from "react";

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

  const [sortOption, setSortOption] = useState("name");
  const [ageFrom, setAgeFrom] = useState(0);
  const [ageTo, setAgeTo] = useState(100);

  const [categories, setCategories] = useState([...listCategories.keys()]);

  const filteredList = useMemo(() => {
    return listData
      .filter(
        (candidate) =>
          candidate.age >= ageFrom &&
          candidate.age <= ageTo &&
          categories.includes(candidate.category)
      )
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
      });
  }, [listData, sortOption, ageFrom, ageTo, categories]);

  const handleCategoryChange = (key: number, checked: boolean) => {
    setCategories((prev) =>
      checked ? [...prev, key] : prev.filter((item) => item !== key)
    );
  };

  return (
    <div id={`list`} className={`${s.list} ${sticky ? s.sticky : ""}`}>
      <div className={s.controls}>
        <form>
          <label>
            Sort by:{" "}
            <select
              name="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
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
                onChange={(e) => {
                  setAgeFrom(Number(e.target.value));
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
                onChange={(e) => {
                  setAgeTo(Number(e.target.value));
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
                  checked={categories.includes(key)}
                  onChange={(e) => handleCategoryChange(key, e.target.checked)}
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
            {filteredList.map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{listCategories.get(item.category)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredList.length === 0 && (
          <p className={`no-data-message ${s.noDataMessage}`}>
            No entries matched the filter settings.
          </p>
        )}
      </div>
    </div>
  );
}

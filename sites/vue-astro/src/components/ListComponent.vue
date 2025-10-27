<script setup lang="ts">
import { ref, computed, type Ref } from "vue";
import { listCategories } from "../assets/listCategory";

const { listData, sticky } = defineProps<{
  listData: { name: string; age: number; category: number }[];
  sticky: boolean;
}>();

const sortOptions = new Map<string, string>([
  ["name", "Name"],
  ["age", "Age"],
  ["category", "Category"],
]);

const sortOption = ref("name");

const ageFrom = ref(0);
const ageTo = ref(100);

const categories: Ref<number[]> = ref([...listCategories.keys()]);

const filteredList = computed(() =>
  listData
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
    }),
);
</script>

<template>
  <div class="list" :class="{ sticky }">
    <div class="controls">
      <form>
        <label>
          Sort by:
          <select v-model="sortOption">
            <option
              v-for="[key, name] in sortOptions.entries()"
              :key
              :value="key"
            >
              {{ name }}
            </option>
          </select>
        </label>
        <fieldset>
          <legend>Age</legend>
          <label>
            From:
            <input v-model="ageFrom" type="number" min="0" max="100" step="1" />
          </label>
          <label>
            To:
            <input v-model="ageTo" type="number" min="0" max="100" step="1" />
          </label>
        </fieldset>
        <fieldset class="categories">
          <legend>Categories</legend>
          <label
            v-for="[key, name] in listCategories.entries()"
            :key
            :value="key"
          >
            <input v-model="categories" type="checkbox" :value="key" />
            {{ name }}
          </label>
        </fieldset>
      </form>
    </div>
    <div class="data">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredList" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.age }}</td>
            <td>{{ listCategories.get(item.category) }}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="filteredList.length === 0" class="no-data-message">
        No entries matched the filter settings.
      </p>
    </div>
  </div>
</template>

<style scoped>
.list {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1em;

  & .controls form {
    border: 0.1em solid black;
    border-radius: 0.7em;
    padding: 1em;
    accent-color: var(--color-tertiary);

    & .categories label {
      display: block;
    }
  }

  & .data {
    & table {
      width: 100%;
      text-align: center;
      border-collapse: collapse;

      & th {
        font-weight: bolder;
        background-color: var(--color-secondary);
      }

      & td,
      & th {
        border: 0.08em solid black;
        height: 3.5em;
      }
    }

    & .no-data-message {
      text-align: center;
    }
  }

  &.sticky {
    & .controls form {
      position: sticky;
      top: calc(var(--header-height) + var(--page-padding));
    }
    & .data thead th {
      top: var(--header-height);
      position: sticky;
    }
  }
}
</style>

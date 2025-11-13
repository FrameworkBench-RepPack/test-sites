import { For } from "solid-js";
import { pages } from "~/assets/pages";

export default function Links() {
  return (
    <For each={[...pages.entries()]}>
      {([path, name]) => (
        <li>
          <a href={path}>{name}</a>
        </li>
      )}
    </For>
  );
}

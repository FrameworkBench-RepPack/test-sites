import { For } from "solid-js";
import { A } from "@solidjs/router";
import { pages } from "../assets/pages";

export default function Links() {
  return (
    <For each={[...pages.entries()]}>
      {([path, name]) => (
        <li>
          <A href={path}>{name}</A>
        </li>
      )}
    </For>
  );
}

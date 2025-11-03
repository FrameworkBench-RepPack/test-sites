import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { pages } from "~/assets/pages";

export default component$(() => {
  return (
    <>
      {[
        ...pages.entries().map(([path, name]) => (
          <li key={path}>
            <Link href={path}>{name}</Link>
          </li>
        )),
      ]}
    </>
  );
});

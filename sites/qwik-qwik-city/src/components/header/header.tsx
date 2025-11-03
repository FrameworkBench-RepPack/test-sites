import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import Links from "../links/links";
import favicon from "~/assets/favicon.svg";
import styles from "./header.module.css";

export default component$(() => {
  return (
    <>
      <header class={[styles.header]}>
        <nav>
          <ul>
            <li>
              <Link href="/">
                <img
                  id="icon"
                  class={[styles.icon]}
                  src={favicon}
                  alt="Front page"
                />
              </Link>
            </li>
            <Links />
          </ul>
        </nav>
      </header>
    </>
  );
});

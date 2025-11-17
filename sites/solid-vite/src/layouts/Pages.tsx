import { A, type RouteSectionProps } from "@solidjs/router";
import Links from "../components/Links";
import styles from "./Pages.module.css";

export default function PagesLayout(props: RouteSectionProps) {
  return (
    <>
      <header class={styles.header}>
        <nav>
          <ul>
            <li>
              <A href="/">
                <img
                  id="icon"
                  class={styles.icon}
                  src="/favicon.svg"
                  alt="Front page"
                />
              </A>
            </li>
            <Links />
          </ul>
        </nav>
      </header>
      <main class={`page-width ${styles.main}`}> {props.children} </main>
    </>
  );
}

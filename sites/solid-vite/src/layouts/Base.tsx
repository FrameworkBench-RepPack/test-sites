import { A, type RouteSectionProps } from "@solidjs/router";
import Links from "../components/Links";
import styles from "./Base.module.css";

export default function BaseLayout(props: RouteSectionProps) {
  return (
    <>
      {props.children}
      <footer class={styles.footer}>
        <div id="footer-content" class={styles["footer-content"]}>
          <A href="/" id="footer-logo" class={styles["footer-logo"]}>
            Test site
          </A>
          <ul>
            <Links />
          </ul>
          <blockquote class={styles.blockquote}>
            Sed blandit est nec quam vulputate, id vulputate ipsum scelerisque.
            Etiam in elit ornare, fermentum nisl vel, gravida ipsum.
          </blockquote>
        </div>
      </footer>
    </>
  );
}

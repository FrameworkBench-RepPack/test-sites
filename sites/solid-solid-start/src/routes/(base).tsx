import { RouteSectionProps } from "@solidjs/router";
import Links from "~/components/Links";
import styles from "./(base).module.css";

export default function BaseLayout(props: RouteSectionProps) {
  return (
    <>
      {props.children}
      <footer class={styles.footer}>
        <div id="footer-content" class={styles["footer-content"]}>
          <a href="/" id="footer-logo" class={styles["footer-logo"]}>
            Test site
          </a>
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

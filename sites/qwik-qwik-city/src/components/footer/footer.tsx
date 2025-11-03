import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import Links from "../links/links";
import styles from "./footer.module.css";

export default component$(() => {
  return (
    <>
      <footer class={[styles.footer]}>
        <div id="footer-content" class={[styles["footer-content"]]}>
          <Link href="/" id="footer-logo" class={[styles["footer-logo"]]}>
            Test site
          </Link>
          <ul>
            <Links />
          </ul>
          <blockquote class={[styles.blockquote]}>
            Sed blandit est nec quam vulputate, id vulputate ipsum scelerisque.
            Etiam in elit ornare, fermentum nisl vel, gravida ipsum.
          </blockquote>
        </div>
      </footer>
    </>
  );
});

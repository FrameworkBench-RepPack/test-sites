import Links from "../links/Links";
import s from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div id="footer-content">
        <a href="/" id="footer-logo">
          Test site
        </a>
        <ul>
          <Links />
        </ul>
        <blockquote>
          Sed blandit est nec quam vulputate, id vulputate ipsum scelerisque.
          Etiam in elit ornare, fermentum nisl vel, gravida ipsum.
        </blockquote>
      </div>
    </footer>
  );
}

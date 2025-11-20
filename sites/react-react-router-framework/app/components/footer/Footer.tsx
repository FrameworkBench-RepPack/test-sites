import { Link } from "react-router";
import Links from "../links/Links";
import s from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div id="footer-content">
        <Link to="/" id="footer-logo">
          Test site
        </Link>
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

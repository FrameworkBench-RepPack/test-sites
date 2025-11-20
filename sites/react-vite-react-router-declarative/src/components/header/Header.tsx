import { Link } from "react-router";
import Links from "@/components/links/Links";
import s from "./Header.module.css";

export default function Header() {
  return (
    <header className={s.header}>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <img
                id={`icon`}
                className={s.icon}
                src={"/icon.svg"}
                alt="Front page"
                loading="lazy"
              />
            </Link>
          </li>
          <Links />
        </ul>
      </nav>
    </header>
  );
}

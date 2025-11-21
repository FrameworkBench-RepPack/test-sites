import Links from "@/components/links/Links";
import s from "./Header.module.css";

export default function Header() {
  return (
    <header className={s.header}>
      <nav>
        <ul>
          <li>
            <a href="/">
              <img
                id={`icon`}
                className={s.icon}
                src={"/icon.svg"}
                alt="Front page"
                loading="lazy"
              />
            </a>
          </li>
          <Links />
        </ul>
      </nav>
    </header>
  );
}

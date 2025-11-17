import Link from "next/link";
import Links from "@/components/links/Links";
import s from "./Header.module.css";

export default function Header() {
  return (
    <header className={s.header}>
      <nav>
        <ul>
          <li>
            <Link href={"/"}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
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

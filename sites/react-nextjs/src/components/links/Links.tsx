import Link from "next/link";
import { pages } from "@/assets/pages";

export default function Links() {
  return (
    <>
      {pages.map((page) => (
        <li key={page.path}>
          <Link href={page.path}>{page.name}</Link>
        </li>
      ))}
    </>
  );
}

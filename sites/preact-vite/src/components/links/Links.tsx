import { pages } from "../../assets/pages";

export default function Links() {
  return (
    <>
      {pages.map((page) => (
        <li key={page.path}>
          <a href={page.path}>{page.name}</a>
        </li>
      ))}
    </>
  );
}

import { Link } from "react-router";
import { pages } from "../../assets/pages";

export default function Links() {
  return (
    <>
      {pages.map((page) => (
        <li key={page.path}>
          <Link to={page.path}>{page.name}</Link>
        </li>
      ))}
    </>
  );
}

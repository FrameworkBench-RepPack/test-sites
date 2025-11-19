import type { Route } from "./+types/root";
import { Links, Meta, Outlet, Scripts } from "react-router";

import ScrollResetWrapper from "./components/wrappers/scroll-reset/scroll-reset";

import "./globals.css";

export const links: Route.LinksFunction = () => [
  {
    rel: "icon",
    type: "image/svg+xml",
    href: "/icon.svg",
  },
];

export const meta: Route.MetaFunction = () => [
  { name: "viewport", content: "width=device-width, initial-scale=1" },
  { charSet: "utf-8" },
  { title: "Test site" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <ScrollResetWrapper>
          {children}
          <Scripts />
        </ScrollResetWrapper>
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ScrollResetWrapper>
      <Outlet />
    </ScrollResetWrapper>
  );
}

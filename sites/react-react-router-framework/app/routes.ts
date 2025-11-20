import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./footer-layout.tsx", [
    index("./routes/home.tsx"),
    layout("./header-layout.tsx", [
      route("faq", "./routes/faq/page.tsx"),
      route("list", "./routes/list/page.tsx"),
      route("live", "./routes/live/page.tsx"),
      route("static-1", "./routes/static-1/page.tsx"),
      route("static-2", "./routes/static-2/page.tsx"),
      route("tooltips", "./routes/tooltips/page.tsx"),
    ]),
  ]),
] satisfies RouteConfig;

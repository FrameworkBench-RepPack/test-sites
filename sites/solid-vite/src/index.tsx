/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import BaseLayout from "./layouts/Base.tsx";
import HomePage from "./pages/Home.tsx";
import PagesLayout from "./layouts/Pages.tsx";
import Static1Page from "./pages/Static1.tsx";
import Static2Page from "./pages/Static2.tsx";
import LivePage from "./pages/Live.tsx";
import TooltipsPage from "./pages/Tooltips.tsx";
import FaqPage from "./pages/Faq.tsx";
import ListPage from "./pages/List.tsx";
import "./index.css";

render(
  () => (
    <Router>
      <Route path="/" component={BaseLayout} >
        <Route path="/" component={HomePage} />
        <Route path="/" component={PagesLayout} >
          <Route path="/static-1/" component={Static1Page} />
          <Route path="/static-2/" component={Static2Page} />
          <Route path="/live/" component={LivePage} />
          <Route path="/tooltips/" component={TooltipsPage} />
          <Route path="/faq/" component={FaqPage} />
          <Route path="/list/" component={ListPage} />
        </Route>
      </Route>
    </Router>
  ),
  document.getElementById("root")!,
);

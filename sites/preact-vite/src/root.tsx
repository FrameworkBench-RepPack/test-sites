import {
  LocationProvider,
  Router,
  Route,
  hydrate,
  prerender as ssr,
} from "preact-iso";

import Home from "@/routes/home";
import Faq from "@/routes/faq/page";
import List from "@/routes/list/page";
import Live from "@/routes/live/page";
import Static1 from "@/routes/static-1/page";
import Static2 from "@/routes/static-2/page";
import Tooltips from "@/routes/tooltips/page";

import "./globals.css";
import FooterLayout from "./footer-layout";
import HeaderLayout from "./header-layout";

export default function App() {
  return (
    <LocationProvider>
      <FooterLayout>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/*" component={SubPageRoute} />
        </Router>
      </FooterLayout>
    </LocationProvider>
  );
}

function SubPageRoute() {
  return (
    <HeaderLayout>
      <Router>
        <Route path="/faq" component={Faq} />
        <Route path="/list" component={List} />
        <Route path="/live" component={Live} />
        <Route path="/static-1" component={Static1} />
        <Route path="/static-2" component={Static2} />
        <Route path="/tooltips" component={Tooltips} />
      </Router>
    </HeaderLayout>
  );
}

if (typeof window !== "undefined") {
  hydrate(<App />, document.getElementById("app"));
}

export async function prerender(data) {
  return await ssr(<App {...data} />);
}

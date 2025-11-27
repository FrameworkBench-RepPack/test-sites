import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import ScrollResetWrapper from "@/components/wrappers/scroll-reset/scroll-reset";
import HeaderLayout from "@/app/header-layout";
import FooterLayout from "@/app/footer-layout";
import Home from "@/app/index.tsx";
import Faq from "@/app/faq/page";
import List from "@/app/list/page";
import Live from "@/app/live/page";
import Static1 from "@/app/static-1/page";
import Static2 from "@/app/static-2/page";
import Tooltips from "@/app/tooltips/page";

import "@/app/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollResetWrapper>
        <Routes>
          <Route element={<FooterLayout />}>
            <Route path="/" element={<Home />} />
            <Route element={<HeaderLayout />}>
              <Route path="faq" element={<Faq />} />
              <Route path="list" element={<List />} />
              <Route path="live" element={<Live />} />
              <Route path="static-1" element={<Static1 />} />
              <Route path="static-2" element={<Static2 />} />
              <Route path="tooltips" element={<Tooltips />} />
            </Route>
          </Route>
        </Routes>
      </ScrollResetWrapper>
    </BrowserRouter>
  </StrictMode>,
);

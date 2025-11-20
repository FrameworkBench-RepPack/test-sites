import { useLayoutEffect, type ReactNode } from "react";
import { useLocation } from "react-router";

export default function ScrollResetWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const currLocation = useLocation();

  // Scroll to top when changing path
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [currLocation.pathname]);

  return children;
}

import { ComponentChildren } from "preact";
import Footer from "@/components/footer/Footer";

interface Props {
  children: ComponentChildren;
}

export default function FooterLayout({ children }: Props) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}

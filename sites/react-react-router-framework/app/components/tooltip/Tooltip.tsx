import {
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import s from "./Tooltip.module.css";

interface Props {
  children: ReactNode;
}

export default function Tooltip({ children }: Props) {
  const [open, setOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setOpen((o) => !o);
  }, []);

  const tooltip: RefObject<HTMLButtonElement | null> = useRef(null);
  const contents: RefObject<HTMLSpanElement | null> = useRef(null);

  useEffect(() => {
    function handleLightDismiss(event: MouseEvent) {
      if (tooltip.current === null || contents.current === null) return;

      const target = event.target as Node;
      if (
        target !== tooltip.current &&
        target !== contents.current &&
        !contents.current?.contains(target)
      ) {
        setOpen(false);
      }
    }

    // Attach the event listener to the document
    document.addEventListener("click", handleLightDismiss);

    // Cleanup on unmount
    return () => {
      document.removeEventListener("click", handleLightDismiss);
    };
  }, []);

  return (
    <>
      {" "}
      <button
        className={`tooltip ${s.tooltip}`}
        onClick={toggleOpen}
        ref={tooltip}
      >
        ?
      </button>
      {open && (
        <span className={`contents ${s.contents}`} ref={contents}>
          {children}
        </span>
      )}{" "}
    </>
  );
}

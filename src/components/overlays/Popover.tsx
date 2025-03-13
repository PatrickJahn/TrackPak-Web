import { useState, useRef, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";

interface PopoverProps {
  content: ReactNode;
  children: ReactNode;
  className?: string;
}

const Popover = ({ content, children, className }: PopoverProps) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [placement, setPlacement] = useState<"top" | "bottom">("bottom");

  const togglePopover = () => setOpen((prev) => !prev);

  const closePopover = (e: MouseEvent | UIEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(e.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(e.target as Node)
    ) {
      setOpen(false);
    }
  };

  const calculatePosition = () => {
    if (buttonRef.current && popoverRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;

      const shouldPlaceAbove =
        spaceBelow < popoverRect.height && spaceAbove > popoverRect.height;

      setPlacement(shouldPlaceAbove ? "top" : "bottom");

      setPosition({
        top: shouldPlaceAbove
          ? buttonRect.top + window.scrollY - popoverRect.height - 8 // above the button
          : buttonRect.bottom + window.scrollY + 8, // below the button
        left: Math.min(
          buttonRect.left + window.scrollX,
          window.innerWidth - popoverRect.width - 16 // 16px margin from the edge
        ),
      });
    }
  };

  useEffect(() => {
    if (open) {
      calculatePosition();
    }
  }, [open]);

  useEffect(() => {
    const closePopover = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", calculatePosition);
    document.addEventListener("mousedown", closePopover);

    return () => {
      window.removeEventListener("resize", calculatePosition);
      document.removeEventListener("mousedown", closePopover);
    };
  }, []);

  useEffect(() => {
    if (open) {
      calculatePosition();
    }
  }, [open, content]);

  return (
    <>
      <div ref={buttonRef} onClick={togglePopover} className="inline-block">
        {children}
      </div>

      {open &&
        createPortal(
          <div
            ref={popoverRef}
            style={{ top: position.top, left: position.left }}
            className={`fixed z-[1000] p-3 bg-white border rounded-lg shadow-lg`}
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
};

export default Popover;

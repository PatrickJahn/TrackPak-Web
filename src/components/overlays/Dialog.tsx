import React, { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils"; // Helper for conditional classNames

// Define available sizes
const SIZE_CLASSES = {
  small: "w-1/4 p-4",
  medium: "w-1/3 p-2",
  large: "w-1/2 p-8",
};

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "small" | "medium" | "large";
  children: ReactNode;
  actions?: ReactNode;
};

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  size = "medium",
  children,
  actions,
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div
        className={`bg-white rounded-lg shadow-lg pt-12 transform transition-all duration-300 ease-out scale-95 opacity-100 animate-in ${SIZE_CLASSES[size]}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">{children}</div>

        {/* Footer / Actions */}
        {actions && (
          <div className="border-t pt-4 flex justify-end space-x-2">
            {actions}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Dialog;

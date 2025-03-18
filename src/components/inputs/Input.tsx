import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils"; // Utility for classNames (optional)

type InputProps = {
  label?: string;
  placeholder?: string;
  type?: string;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  error?: string;
  disabled?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  type = "text",
  icon: Icon,
  iconPosition = "left",
  error,
  disabled = false,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col w-full">
      {label && <label className="text-sm font-medium mb-1">{label}</label>}

      <div className="relative">
        {/* Icon (if present) */}
        {Icon && (
          <Icon
            className={cn(
              "absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500",
              iconPosition === "left" ? "left-3" : "right-3"
            )}
          />
        )}

        {/* Input field */}
        <input
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "w-full border focus:border-primary rounded-md p-2 transition-all duration-200 outline-none",
            Icon && iconPosition === "left" ? "pl-10" : "pr-10",
            disabled && "bg-gray-200 cursor-not-allowed",
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500",
            className
          )}
          {...props}
        />
      </div>

      {/* Error message */}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Input;

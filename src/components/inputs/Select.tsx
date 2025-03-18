import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils"; // Utility for conditional classNames (if you have it)

type SelectProps = {
  label?: string;
  placeholder?: string;
  options: { label: string; value: string }[]; // Options array
  icon?: LucideIcon;
  error?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const Select: React.FC<SelectProps> = ({
  label,
  placeholder,
  options,
  icon: Icon,
  error,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col w-full">
      {label && <label className="text-sm font-medium mb-1">{label}</label>}

      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
        )}

        <select
          className={cn(
            "w-full border rounded-lg p-2 h-10 transition-all duration-200 outline-none bg-white",
            Icon ? "pl-10" : "",
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500",
            className
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Select;

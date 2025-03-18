import React from "react";
import { cn } from "@/lib/utils"; // Utility for classNames
import { LucideIcon } from "lucide-react";

type ButtonProps = {
  variant?: "primary" | "secondary" | "outline" | "destructive";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon; // Accepts Lucide icons (or any React component)
  iconPosition?: "left" | "right";
  disabled?: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  disabled = false,
  children,
  className,
  ...props
}) => {
  // Tailwind classes for each variant
  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary-darker",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    outline: "border border-primary text-gray-900 hover:bg-primary-100",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  };

  // Tailwind classes for different sizes
  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={cn(
        "flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
        variantClasses[variant],
        sizeClasses[size],
        disabled ? "opacity-50 cursor-not-allowed" : "",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {/* Render icon if provided */}
      {Icon && iconPosition === "left" && <Icon className="w-5 h-5" />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="w-5 h-5" />}
    </button>
  );
};

export default Button;

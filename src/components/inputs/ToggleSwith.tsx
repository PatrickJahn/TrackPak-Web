import { useState } from "react";

interface ToggleSwitchProps {
  label?: string;
  initialChecked?: boolean;
  size?: "small" | "medium" | "large";
  onChange?: (checked: boolean) => void;
}

const sizeClasses = {
  small: {
    container: "w-9 h-5",
    circle: "w-3 h-3",
    translate: "translate-x-4",
  },
  medium: {
    container: "w-11 h-6",
    circle: "w-4 h-4",
    translate: "translate-x-5",
  },
  large: {
    container: "w-14 h-7",
    circle: "w-5 h-5",
    translate: "translate-x-7",
  },
};

const ToggleSwitch = ({
  label,
  initialChecked = false,
  size = "medium",
  onChange,
}: ToggleSwitchProps) => {
  const [checked, setChecked] = useState(initialChecked);
  const { container, circle, translate } = sizeClasses[size];

  const handleToggle = (val: boolean) => {
    setChecked((prev) => {
      const newChecked = !prev;
      return newChecked;
    });
    onChange?.(val);
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={() => handleToggle(!checked)}
      />
      <div
        className={`relative ${container} rounded-full transition-colors duration-200 ${
          checked ? "bg-blue-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute left-1 top-1 bg-white ${circle} rounded-full transition-transform duration-300 ${
            checked ? translate : ""
          }`}
        />
      </div>
      {label && (
        <span className="ml-3 text-sm font-medium text-gray-900">{label}</span>
      )}
    </label>
  );
};

export default ToggleSwitch;

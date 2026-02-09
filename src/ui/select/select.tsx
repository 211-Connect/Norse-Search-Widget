import { useState, useRef, useEffect } from "react";
import * as styles from "./select.css";
import { ChevronDownIcon } from "../../icons";

interface SelectProps {
  id?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  options: { value: string | number; label: string }[];
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
}

export const Select = ({
  id,
  value,
  onChange,
  options,
  size = "md",
  className = "",
  disabled = false,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string | number) => {
    if (!disabled && onChange) {
      onChange(String(optionValue));
    }
    setIsOpen(false);
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      id={id}
      ref={containerRef}
      className={`${styles.selectContainer} ${className}`}
    >
      <button
        type="button"
        onClick={handleToggle}
        className={`${styles.select} ${styles.selectSize[size]} ${
          isOpen ? styles.selectOpen : ""
        }`}
        disabled={disabled}
      >
        <span className={styles.selectLabel}>
          {selectedOption?.label || "Select..."}
        </span>
        <ChevronDownIcon
          size={16}
          className={`${styles.selectIcon} ${isOpen ? styles.selectIconOpen : ""}`}
        />
      </button>

      {isOpen && (
        <div className={`${styles.dropdown} ${styles.dropdownSize[size]}`}>
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`${styles.option} ${
                option.value === value ? styles.optionSelected : ""
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

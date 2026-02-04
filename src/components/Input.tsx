import { ComponentType } from "preact";
import { IconProps } from "../icons";
import * as styles from "./Input.css";

interface InputProps {
  id?: string;
  value?: string;
  placeholder?: string;
  onClick?: () => void;
  onInput?: (e: Event) => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  readOnly?: boolean;
  autoFocus?: boolean;
  className?: string;
  Icon?: ComponentType<IconProps>;
  size?: "sm" | "md" | "lg";
}

export const Input = ({
  id,
  value,
  placeholder,
  onClick,
  onInput,
  onKeyDown,
  readOnly,
  autoFocus,
  className = "",
  Icon,
  size = "md",
}: InputProps) => {
  const paddingClass = Icon ? styles.inputWithIcon : styles.inputWithoutIcon;

  return (
    <div className={styles.container}>
      {Icon && (
        <div className={styles.iconWrapper}>
          <Icon id={`${id}-icon`} color="var(--widget-primary)" />
        </div>
      )}

      <input
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        onClick={onClick}
        onInput={onInput}
        onKeyDown={onKeyDown}
        readOnly={readOnly}
        autoFocus={autoFocus}
        className={`${styles.input} ${styles.inputSize[size]} ${paddingClass} ${className}`}
      />
    </div>
  );
};

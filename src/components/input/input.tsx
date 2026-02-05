import { ComponentType } from "preact";
import { IconProps } from "../../icons";
import * as styles from "./input.css";

interface InputProps {
  id?: string;
  value?: string;
  placeholder?: string;
  onClick?: () => void;
  onInput?: (value: string) => void;
  readOnly?: boolean;
  autoFocus?: boolean;
  Icon?: ComponentType<IconProps>;
  size?: "sm" | "md" | "lg";
}

export const Input = ({
  id,
  value,
  placeholder,
  onClick,
  onInput,
  readOnly,
  autoFocus,
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
        onInput={(e) =>
          onInput && onInput((e.target as HTMLInputElement).value)
        }
        readOnly={readOnly}
        autoFocus={autoFocus}
        className={`${styles.input} ${styles.inputSize[size]} ${paddingClass}`}
      />
    </div>
  );
};

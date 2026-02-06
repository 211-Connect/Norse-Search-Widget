import { ComponentType, Ref } from "preact";
import { IconProps } from "../../icons";
import * as styles from "./input.css";

interface InputProps {
  id?: string;
  value?: string;
  placeholder?: string;
  inputRef?: Ref<HTMLInputElement>;
  onClick?: () => void;
  onInput?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  autofocus?: boolean;
  readOnly?: boolean;
  Icon?: ComponentType<IconProps>;
  size?: "sm" | "md" | "lg";
}

export const Input = ({
  id,
  value,
  placeholder,
  inputRef,
  onClick,
  onInput,
  onFocus,
  onBlur,
  autofocus,
  readOnly,
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
        ref={inputRef}
        type="text"
        value={value}
        placeholder={placeholder}
        onClick={onClick}
        onInput={(e) =>
          onInput && onInput((e.target as HTMLInputElement).value)
        }
        onFocus={onFocus}
        onBlur={onBlur}
        autoFocus={autofocus}
        readOnly={readOnly}
        className={`${styles.input} ${styles.inputSize[size]} ${paddingClass}`}
      />
    </div>
  );
};

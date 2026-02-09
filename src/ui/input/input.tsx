import { ComponentType, Ref } from "preact";
import { IconProps, XIcon } from "../../icons";
import { useConfigContext } from "../../context/config-context";
import { getOtherTranslations } from "../../locales";
import * as styles from "./input.css";

interface InputProps {
  id?: string;
  value?: string;
  placeholder?: string | null;
  inputRef?: Ref<HTMLInputElement>;
  onClick?: () => void;
  onInput?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClear?: () => void;
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
  onClear,
  autofocus,
  readOnly,
  Icon,
  size = "md",
}: InputProps) => {
  const { locale } = useConfigContext();
  const otherTexts = getOtherTranslations(locale);
  const paddingClass = Icon ? styles.inputWithIcon : styles.inputWithoutIcon;
  const paddingRightClass = onClear && value ? styles.inputWithClear : "";

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
        placeholder={placeholder || undefined}
        onClick={onClick}
        onInput={(e) =>
          onInput && onInput((e.target as HTMLInputElement).value)
        }
        onFocus={onFocus}
        onBlur={onBlur}
        autoFocus={autofocus}
        readOnly={readOnly}
        className={`${styles.input} ${styles.inputSize[size]} ${paddingClass} ${paddingRightClass}`}
      />

      {onClear && value && (
        <button
          id={`${id}-clear`}
          type="button"
          onClick={onClear}
          className={styles.clearButton}
          aria-label={otherTexts.clearInput}
        >
          <XIcon color="var(--widget-primary)" size={16} />
        </button>
      )}
    </div>
  );
};

import * as styles from "./button.css";
import { IconProps } from "../../icons";
import { ComponentChildren, ComponentType } from "preact";

type ButtonProps = {
  onClick?: () => void;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  Icon?: ComponentType<IconProps>;
  iconPosition?: "left" | "right";
  id?: string;
  children?: ComponentChildren;
};

export const Button = ({
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  Icon,
  iconPosition = "left",
  children,
  id,
}: ButtonProps) => {
  const iconColor = variant === "primary" ? "white" : "var(--widget-primary)";

  return (
    <button
      id={id}
      onClick={onClick}
      className={`${styles.base} ${styles.size[size]} ${styles.variant[variant]} ${className}`}
    >
      {Icon && iconPosition === "left" && (
        <div className={styles.iconWrapper} id={`${id}-icon-left`}>
          <Icon color={iconColor} size={16} />
        </div>
      )}
      {children}
      {Icon && iconPosition === "right" && (
        <div className={styles.iconWrapper} id={`${id}-icon-right`}>
          <Icon color={iconColor} size={16} />
        </div>
      )}
    </button>
  );
};

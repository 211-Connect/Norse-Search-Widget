import { IconProps, defaultIconProps } from "./types";

export const ChevronLeftIcon = ({
  size = defaultIconProps.size,
  color,
  className = "",
  strokeWidth = defaultIconProps.strokeWidth,
  id,
}: IconProps) => (
  <svg
    id={id}
    width={size}
    height={size}
    className={className}
    style={{ color }}
    fill="none"
    viewBox="0 0 16 16"
  >
    <path
      d="M10 12L6 8L10 4"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

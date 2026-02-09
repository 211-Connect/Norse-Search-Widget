import { IconProps, defaultIconProps } from "./types";

export const ChevronDownIcon = ({
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
      d="M4 6L8 10L12 6"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

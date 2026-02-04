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
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

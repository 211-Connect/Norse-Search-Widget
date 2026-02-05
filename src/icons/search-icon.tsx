import { IconProps, defaultIconProps } from "./types";

export const SearchIcon = ({
  size = defaultIconProps.size,
  color,
  className = "",
  strokeWidth = defaultIconProps.strokeWidth,
}: IconProps) => (
  <svg
    width={size}
    height={size}
    className={className}
    style={{ color }}
    fill="none"
    viewBox="0 0 16 16"
  >
    <path
      d="M14 14L11.1067 11.1067M12.6667 7.33333C12.6667 10.2789 10.2789 12.6667 7.33333 12.6667C4.38781 12.6667 2 10.2789 2 7.33333C2 4.38781 4.38781 2 7.33333 2C10.2789 2 12.6667 4.38781 12.6667 7.33333Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

import { IconProps, defaultIconProps } from "./types";

export const TargetIcon = ({
  size = defaultIconProps.size,
  color = "#0044B5",
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
    <g clipPath="url(#clip0_1806_16)">
      <path
        d="M1.33334 8.00065H3.33334M3.33334 8.00065C3.33334 10.578 5.42268 12.6673 8.00001 12.6673M3.33334 8.00065C3.33334 5.42332 5.42268 3.33398 8.00001 3.33398M12.6667 8.00065H14.6667M12.6667 8.00065C12.6667 10.578 10.5773 12.6673 8.00001 12.6673M12.6667 8.00065C12.6667 5.42332 10.5773 3.33398 8.00001 3.33398M8.00001 1.33398V3.33398M8.00001 12.6673V14.6673"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1806_16">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

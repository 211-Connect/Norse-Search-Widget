import { IconProps, defaultIconProps } from './types';

export const SearchIcon = ({
  size = defaultIconProps.size,
  color,
  className = '',
  strokeWidth = defaultIconProps.strokeWidth,
}: IconProps) => (
  <svg
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
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

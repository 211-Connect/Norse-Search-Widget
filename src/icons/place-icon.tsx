import { IconProps, defaultIconProps } from "./types";

export const PlaceIcon = ({
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
      d="M13.3333 6.66634C13.3333 9.99501 9.64063 13.4617 8.40063 14.5323C8.28511 14.6192 8.14449 14.6662 7.99996 14.6662C7.85543 14.6662 7.71481 14.6192 7.59929 14.5323C6.35929 13.4617 2.66663 9.99501 2.66663 6.66634C2.66663 5.25185 3.22853 3.8953 4.22872 2.89511C5.22892 1.89491 6.58547 1.33301 7.99996 1.33301C9.41445 1.33301 10.771 1.89491 11.7712 2.89511C12.7714 3.8953 13.3333 5.25185 13.3333 6.66634Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.99996 8.66634C9.10453 8.66634 9.99996 7.77091 9.99996 6.66634C9.99996 5.56177 9.10453 4.66634 7.99996 4.66634C6.89539 4.66634 5.99996 5.56177 5.99996 6.66634C5.99996 7.77091 6.89539 8.66634 7.99996 8.66634Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

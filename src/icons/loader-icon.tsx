import { IconProps, defaultIconProps } from "./types";

export const LoaderIcon = ({
  size = defaultIconProps.size,
  color,
  className = "",
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
      d="M8 2V4M8 12V14M14 8H12M4 8H2M12.2426 3.75736L10.8284 5.17157M5.17157 10.8284L3.75736 12.2426M12.2426 12.2426L10.8284 10.8284M5.17157 5.17157L3.75736 3.75736"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        from="0 8 8"
        to="360 8 8"
        dur="1s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

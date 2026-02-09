import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const radiusGroup = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.xs,
});

export const radiusLabel = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.text,
  whiteSpace: "nowrap",
});

export const distanceSelect = style({
  width: "120px",
  flexShrink: 0,
});

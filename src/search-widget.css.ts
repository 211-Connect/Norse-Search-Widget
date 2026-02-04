import { style } from "@vanilla-extract/css";
import { vars } from "./styles/theme.css";

export const container = style({
  padding: vars.spacing.md,
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.md,
  backgroundColor: "var(--widget-primary)",
  borderRadius: "var(--widget-radius)",
});

export const title = style({
  fontSize: vars.fontSize.xl,
  fontWeight: vars.fontWeight.medium,
  lineHeight: vars.lineHeight.xl,
  color: vars.color.white,
});

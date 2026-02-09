import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "src/styles/theme.css";

const slideInFade = keyframes({
  from: {
    opacity: 0,
    transform: "translateY(0.5rem)",
  },
  to: {
    opacity: 1,
    transform: "translateY(0)",
  },
});

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.md,
  paddingBlock: vars.spacing.md,
  overflowY: "auto",
  flex: 1,
  minHeight: 0,
  animation: `${slideInFade} 0.25s ease-out`,
});

export const group = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.sm,
});

export const groupTitle = style({
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.medium,
  color: vars.color.black,
});

export const itemsList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["2xs"],
});

export const item = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.sm,
  padding: vars.spacing.xs,
  cursor: "pointer",
  borderRadius: "var(--widget-radius)",
  transition: vars.transition.colors,
  ":hover": {
    backgroundColor: vars.color.gray[100],
  },
});

export const iconWrapper = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: vars.spacing.md,
  height: vars.spacing.md,
  color: "var(--widget-primary)",
});

export const itemText = style({
  flex: 1,
  fontSize: vars.fontSize.xs,
  color: "var(--widget-primary)",
  lineHeight: vars.lineHeight.sm,
});

export const badge = style({
  paddingBlock: vars.spacing["2xs"],
  paddingInline: vars.spacing.xs,
  fontSize: vars.fontSize.xs,
  color: "var(--widget-primary)",
  border: `1px solid ${vars.color.gray[300]}`,
  borderRadius: "var(--widget-radius)",
  flexShrink: 0,
});

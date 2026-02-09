import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const base = style({
  fontWeight: vars.fontWeight.medium,
  transition: vars.transition.colors,
  cursor: "pointer",
  borderRadius: "var(--widget-radius)",
  border: "1px solid var(--widget-primary)",
  display: "inline-flex",
  alignItems: "center",
  ":disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});

export const iconWrapper = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const size = styleVariants({
  sm: {
    paddingBlock: vars.spacing.xs,
    paddingInline: vars.spacing.sm,
    fontSize: vars.fontSize.xs,
    lineHeight: vars.lineHeight.xs,
    gap: vars.spacing["2xs"],
  },
  md: {
    paddingBlock: vars.spacing.xs,
    paddingInline: vars.spacing.sm,
    fontSize: vars.fontSize.sm,
    lineHeight: vars.lineHeight.sm,
    gap: vars.spacing["2xs"],
  },
  lg: {
    paddingBlock: vars.spacing.md,
    paddingInline: vars.spacing.lg,
    fontSize: vars.fontSize.md,
    lineHeight: vars.lineHeight.md,
    gap: vars.spacing.xs,
  },
});

export const variant = styleVariants({
  primary: {
    backgroundColor: "var(--widget-primary)",
    color: vars.color.white,
    ":hover:not(:disabled)": {
      opacity: 0.9,
    },
  },
  secondary: {
    backgroundColor: vars.color.white,
    color: "var(--widget-primary)",
    ":hover:not(:disabled)": {
      backgroundColor: vars.color.gray[100],
    },
  },
  link: {
    backgroundColor: "transparent",
    color: vars.color.white,
    border: "none",
    padding: 0,
    ":hover": {
      textDecoration: "underline",
    },
  },
});

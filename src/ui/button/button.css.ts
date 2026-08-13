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

const getVariant = (styleImportant: boolean) =>
  styleVariants({
    primary: {
      backgroundColor: `var(--widget-primary) ${styleImportant ? "!important" : ""}`,
      color: `${vars.color.white} ${styleImportant ? "!important" : ""}`,
      ":hover:not(:disabled)": {
        opacity: 0.9,
      },
    },
    secondary: {
      backgroundColor: `${vars.color.white} ${styleImportant ? "!important" : ""}`,
      color: `var(--widget-primary) ${styleImportant ? "!important" : ""}`,
      ":hover:not(:disabled)": {
        backgroundColor: `${vars.color.gray[100]} ${styleImportant ? "!important" : ""}`,
      },
    },
    link: {
      backgroundColor: `transparent ${styleImportant ? "!important" : ""}`,
      color: `var(--widget-primary) ${styleImportant ? "!important" : ""}`,
      border: "none",
      paddingInline: 0,
      ":hover": {
        textDecoration: "underline",
      },
    },
    "link-white": {
      backgroundColor: `transparent ${styleImportant ? "!important" : ""}`,
      color: `${vars.color.white} ${styleImportant ? "!important" : ""}`,
      border: "none",
      paddingInline: 0,
      ":hover": {
        textDecoration: "underline",
      },
    },
  });

export const defaultVariant = getVariant(false);
export const importantVariant = getVariant(true);

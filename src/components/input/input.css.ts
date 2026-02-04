import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const container = style({
  position: "relative",
  width: "100%",
});

export const iconWrapper = style({
  position: "absolute",
  left: vars.spacing.sm,
  height: "100%",
  display: "flex",
  alignItems: "center",
});

export const input = style({
  width: "100%",
  backgroundColor: vars.color.white,
  cursor: "pointer",
  border: `1px solid ${vars.color.gray[300]}`,
  borderRadius: "var(--widget-radius)",
  outline: "none",
  fontWeight: vars.fontWeight.normal,
  ":focus": {
    borderColor: "var(--widget-primary)",
  },
});

export const inputSize = styleVariants({
  sm: {
    padding: `${vars.spacing.xs} ${vars.spacing.sm}`,
    fontSize: vars.fontSize.sm,
    lineHeight: vars.lineHeight.sm,
  },
  md: {
    padding: `${vars.spacing.sm} ${vars.spacing.md}`,
    fontSize: vars.fontSize.md,
    lineHeight: vars.lineHeight.sm,
  },
  lg: {
    padding: `${vars.spacing.md} ${vars.spacing.lg}`,
    fontSize: vars.fontSize.lg,
    lineHeight: vars.lineHeight.md,
  },
});

export const inputWithIcon = style({
  paddingLeft: "2.5rem",
});

export const inputWithoutIcon = style({});

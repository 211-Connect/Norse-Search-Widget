import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const selectContainer = style({
  position: "relative",
  width: "100%",
});

export const select = style({
  width: "100%",
  backgroundColor: vars.color.white,
  color: vars.color.text,
  cursor: "pointer",
  border: `1px solid ${vars.color.gray[300]}`,
  borderRadius: "var(--widget-radius)",
  outline: "none",
  fontWeight: vars.fontWeight.normal,
  textAlign: "left",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.spacing.xs,
  ":focus": {
    borderColor: "var(--widget-primary)",
  },
  ":disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});

export const selectLabel = style({
  flex: 1,
  textAlign: "left",
});

export const selectIcon = style({
  flexShrink: 0,
  transition: "transform 0.2s ease",
  color: vars.color.gray[300],
});

export const selectIconOpen = style({
  transform: "rotate(180deg)",
});

export const selectOpen = style({
  borderColor: "var(--widget-primary)",
});

export const dropdown = style({
  position: "absolute",
  top: "calc(100% + 4px)",
  left: 0,
  right: 0,
  backgroundColor: vars.color.white,
  border: `1px solid ${vars.color.gray[300]}`,
  borderRadius: "var(--widget-radius)",
  boxShadow:
    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  zIndex: 1000,
  maxHeight: "240px",
  overflowY: "auto",
});

export const option = style({
  padding: `${vars.spacing.xs} ${vars.spacing.sm}`,
  cursor: "pointer",
  transition: "background-color 0.15s ease",
  ":hover": {
    backgroundColor: vars.color.gray[100],
  },
});

export const optionSelected = style({
  backgroundColor: "var(--widget-primary)",
  color: vars.color.white,
  ":hover": {
    backgroundColor: "var(--widget-primary)",
    opacity: 0.9,
  },
});

export const selectSize = styleVariants({
  sm: {
    padding: `${vars.spacing["2xs"]} ${vars.spacing.xs}`,
    fontSize: vars.fontSize.xs,
    lineHeight: vars.lineHeight.xs,
  },
  md: {
    padding: `${vars.spacing.xs} ${vars.spacing.sm}`,
    fontSize: vars.fontSize.sm,
    lineHeight: vars.lineHeight.sm,
  },
  lg: {
    padding: `${vars.spacing.sm} ${vars.spacing.md}`,
    fontSize: vars.fontSize.md,
    lineHeight: vars.lineHeight.md,
  },
});

export const dropdownSize = styleVariants({
  sm: {
    fontSize: vars.fontSize.xs,
  },
  md: {
    fontSize: vars.fontSize.sm,
  },
  lg: {
    fontSize: vars.fontSize.md,
  },
});

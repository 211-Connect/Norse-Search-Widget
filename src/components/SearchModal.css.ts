import { style } from "@vanilla-extract/css";
import { vars } from "../styles/theme.css";

export const overlay = style({
  position: "fixed",
  inset: 0,
  zIndex: 50,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100vw",
  height: "100vh",
  backgroundColor: vars.color.white,
  top: 0,
  left: 0,
});

export const content = style({
  display: "flex",
  width: "100%",
  maxWidth: "36rem", // 576px
  flexDirection: "column",
  gap: vars.spacing.md,
  padding: vars.spacing.md,
});

export const buttonRow = style({
  display: "flex",
  justifyContent: "space-between",
  gap: vars.spacing.sm,
});

export const focusInput = style({
  border: `1px solid ${vars.color.gray[300]}`,
  transition: vars.transition.colors,
  ":focus": {
    borderColor: "var(--widget-primary)",
  },
});

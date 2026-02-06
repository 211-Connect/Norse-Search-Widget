import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const overlay = style({
  position: "fixed",
  inset: 0,
  zIndex: 50,
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  width: "100vw",
  height: "100vh",
  backgroundColor: vars.color.white,
  top: 0,
  left: 0,
  padding: "1rem",
  "@media": {
    "(min-height: 1024px)": {
      padding: "8rem 1rem",
    },
  },
});

export const content = style({
  display: "flex",
  width: "100%",
  maxWidth: "24rem", // 384px
  maxHeight: "100%",
  flexDirection: "column",
  gap: vars.spacing.md,
});

export const buttonRow = style({
  display: "flex",
  justifyContent: "space-between",
  gap: vars.spacing.sm,
});

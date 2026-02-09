import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

const slideUp = keyframes({
  from: {
    opacity: 0,
    transform: "translateY(1rem)",
  },
  to: {
    opacity: 1,
    transform: "translateY(0)",
  },
});

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
  animation: `${fadeIn} 0.2s ease-out`,
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
  animation: `${slideUp} 0.3s ease-out`,
});

export const buttonRow = style({
  display: "flex",
  justifyContent: "space-between",
  gap: vars.spacing.sm,
});

export const locationError = style({
  color: "red",
  fontSize: vars.fontSize.xs,
  margin: 0,
});

export const locationRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.spacing.sm,
  width: "100%",
});

import { createGlobalTheme, createThemeContract } from "@vanilla-extract/css";

export const vars = createThemeContract({
  color: {
    primary: null,
    white: null,
    gray: {
      100: null,
      200: null,
      300: null,
    },
  },
  borderRadius: {
    widget: null,
  },
  spacing: {
    "2xs": null,
    xs: null,
    sm: null,
    md: null,
    lg: null,
    xl: null,
  },
  fontSize: {
    xs: null,
    sm: null,
    md: null,
    lg: null,
    xl: null,
  },
  fontWeight: {
    normal: null,
    medium: null,
  },
  lineHeight: {
    xs: null,
    sm: null,
    md: null,
    lg: null,
    xl: null,
  },
  transition: {
    colors: null,
  },
});

// 1rem = 16px
// This will be overridden at runtime by CSS variables
export const defaultTheme = createGlobalTheme(":root", vars, {
  color: {
    primary: "var(--widget-primary, #3b82f6)",
    white: "#ffffff",
    gray: {
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
    },
  },
  borderRadius: {
    widget: "var(--widget-radius, 0.5rem)",
  },
  spacing: {
    "2xs": "0.25rem",
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.25rem",
    xl: "1.5rem",
  },
  fontWeight: {
    normal: "400",
    medium: "500",
  },
  lineHeight: {
    xs: "0.875rem",
    sm: "1rem",
    md: "1.25rem",
    lg: "1.5rem",
    xl: "2rem",
  },
  transition: {
    colors:
      "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
  },
});

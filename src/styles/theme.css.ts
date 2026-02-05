import { createGlobalTheme, createThemeContract } from "@vanilla-extract/css";

export const vars = createThemeContract({
  color: {
    /**
     * @deprecated DO NOT USE - Use CSS variable "var(--widget-primary)" instead.
     *
     * This value is compiled at build-time by Vanilla Extract and cannot be
     * dynamically changed at runtime. Since this widget needs to support
     * runtime theming (users can customize colors), always use the CSS variable
     * "var(--widget-primary)" directly in your styles instead of vars.color.primary.
     *
     * @example
     * // ❌ Wrong - compiled at build time, cannot change
     * color: vars.color.primary
     *
     * // ✅ Correct - runtime CSS variable
     * color: "var(--widget-primary)"
     */
    primary: null,
    white: null,
    black: null,
    gray: {
      100: null,
      200: null,
      300: null,
    },
  },
  borderRadius: {
    /**
     * @deprecated DO NOT USE - Use CSS variable "var(--widget-radius)" instead.
     *
     * This value is compiled at build-time by Vanilla Extract and cannot be
     * dynamically changed at runtime. Since this widget needs to support
     * runtime theming (users can customize border radius), always use the CSS
     * variable "var(--widget-radius)" directly in your styles instead of
     * vars.borderRadius.widget.
     *
     * @example
     * // ❌ Wrong - compiled at build time, cannot change
     * borderRadius: vars.borderRadius.widget
     *
     * // ✅ Correct - runtime CSS variable
     * borderRadius: "var(--widget-radius)"
     */
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
    black: "#000000",
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

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
          "outline": "#7e775f",
          "secondary-fixed": "#ffdcc3",
          "secondary-fixed-dim": "#ffb77d",
          "on-secondary-fixed-variant": "#6e3900",
          "on-background": "#1b1b1b",
          "secondary-container": "#fd8b00",
          "surface-container-low": "#f3f3f3",
          "inverse-primary": "#e9c400",
          "background": "#f9f9f9",
          "surface-container-high": "#e8e8e8",
          "on-surface": "#1b1b1b",
          "on-secondary-fixed": "#2f1500",
          "surface-variant": "#e2e2e2",
          "surface-container": "#eeeeee",
          "primary": "#705d00",
          "outline-variant": "#d0c6ab",
          "on-error-container": "#93000a",
          "primary-container": "#ffd700",
          "surface-bright": "#f9f9f9",
          "error-container": "#ffdad6",
          "error": "#ba1a1a",
          "secondary": "#904d00",
          "on-primary-fixed-variant": "#544600",
          "primary-fixed-dim": "#e9c400",
          "on-tertiary-fixed-variant": "#004f4f",
          "surface-dim": "#dadada",
          "tertiary-fixed": "#00fbfb",
          "on-secondary-container": "#603100",
          "surface-container-lowest": "#ffffff",
          "on-secondary": "#ffffff",
          "surface-container-highest": "#e2e2e2",
          "on-primary": "#ffffff",
          "surface-tint": "#705d00",
          "on-tertiary": "#ffffff",
          "on-tertiary-fixed": "#002020",
          "inverse-on-surface": "#f1f1f1",
          "tertiary-fixed-dim": "#00dddd",
          "on-error": "#ffffff",
          "primary-fixed": "#ffe16d",
          "on-primary-fixed": "#221b00",
          "tertiary-container": "#00f2f2",
          "surface": "#f9f9f9",
          "on-primary-container": "#705e00",
          "on-surface-variant": "#4d4732",
          "inverse-surface": "#303030",
          "tertiary": "#006a6a",
          "on-tertiary-container": "#006a6a"
      },
      "borderRadius": {
          "DEFAULT": "1rem",
          "lg": "2rem",
          "xl": "3rem",
          "full": "9999px"
      },
      "spacing": {
          "container-padding": "24px",
          "margin": "32px",
          "stack-gap": "16px",
          "gutter": "24px",
          "unit": "8px"
      },
      "fontFamily": {
          "headline-md": ["Plus Jakarta Sans"],
          "body-md": ["Plus Jakarta Sans"],
          "body-lg": ["Plus Jakarta Sans"],
          "headline-lg": ["Plus Jakarta Sans"],
          "headline-xl": ["Plus Jakarta Sans"],
          "label-bold": ["Plus Jakarta Sans"]
      },
      "fontSize": {
          "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "700"}],
          "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "500"}],
          "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "500"}],
          "headline-lg": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "800"}],
          "headline-xl": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "800"}],
          "label-bold": ["14px", {"lineHeight": "20px", "fontWeight": "700"}]
      }
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/forms')
  ],
}


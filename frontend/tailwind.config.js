/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary brand color - Bright Cyan Blue (#009ad9)
        primary: {
          50: "#e6f7fd",
          100: "#cceffa",
          200: "#99dff6",
          300: "#66cff1",
          400: "#33bfed",
          500: "#009ad9", // Main brand color
          600: "#007bae",
          700: "#005c82",
          800: "#003e57",
          900: "#001f2b",
        },
        // Dark Navy (#122249)
        navy: {
          50: "#e8eaf0",
          100: "#d1d5e1",
          200: "#a3abc3",
          300: "#7581a5",
          400: "#475787",
          500: "#122249", // Main dark navy
          600: "#0e1b3a",
          700: "#0b142c",
          800: "#070e1d",
          900: "#04070f",
        },
        // Light Blue (#abc2dd)
        light: {
          50: "#f7f9fc",
          100: "#eff3f9",
          200: "#dfe7f3",
          300: "#cfdbec",
          400: "#bfcfe6",
          500: "#abc2dd", // Main light blue
          600: "#8ba9ca",
          700: "#6b90b7",
          800: "#5577a4",
          900: "#435e83",
        },
        // Neutral/Gray scale for text and backgrounds
        dark: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        // Success, Warning, Error colors (standard)
        success: "#22c55e",
        warning: "#f59e0b",
        error: "#ef4444",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 15px rgba(0, 0, 0, 0.08)",
        medium: "0 4px 20px rgba(0, 0, 0, 0.12)",
        hard: "0 10px 40px rgba(0, 0, 0, 0.15)",
        "glow-primary": "0 0 20px rgba(0, 154, 217, 0.3)",
        "glow-navy": "0 0 20px rgba(18, 34, 73, 0.3)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "bounce-slow": "bounce 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  plugins: [require("@tailwindcss/typography")], // ✅ ONLY THIS

  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "800px",
        lg: "1100px",
      },

      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
        dark: {
          800: "#1f2937",
          900: "#111827",
        },
        background: "#ffffff",
        foreground: "#1f2937",
        header: "#eaf6ff",
      },

      spacing: {
        18: "4.5rem",
        88: "22rem",
      },

      borderRadius: {
        xl: "0.75rem",
      },

      animation: {
        "fade-in-down-longer": "fadeInDown 2s ease-out both",
        "fade-in-down": "fadeInDown 1s ease-out both",
        "fade-in-left": "fadeInLeft 1s ease-out both",
        bounceCustom: "bounceCustom 2s infinite",
      },

      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(40px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: 0, transform: "translateY(-40px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeInLeft: {
          "0%": { opacity: 0, transform: "translateX(40px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        vibrate: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-2px)" },
          "40%": { transform: "translateX(2px)" },
          "60%": { transform: "translateX(-2px)" },
          "80%": { transform: "translateX(2px)" },
        },
        bounceCustom: {
          "0%, 100%": {
            transform: "translateY(-60px)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
    },
  },

  corePlugins: {
    transform: true,
  },
};
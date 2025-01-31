// @ts-check
const { withUt } = require("uploadthing/tw");

/** @type {import('tailwindcss').Config} */
module.exports = withUt({
  
  darkMode: ["class"],
    content: [
      './pages/**/*.{ts,tsx}',
      './components/**/*.{ts,tsx}',
      './app/**/*.{ts,tsx}',
      './src/**/*.{ts,tsx}',
    ],
    prefix: "",
    theme: {

      container: {
        center: true,
        padding: "2rem",
        screens: {
          "xsm": {min: "380px"},
          "2xl": "1400px",
        },
      },
      extend: {
        screens: {
          "xsm": "380px"
        },
        backgroundColor: {
          'chat-grey': 'var(--chat-grey)',
          'server-sidebar': 'var(--server-sidebar)',
          'bento-item': 'var(--bento-item)',
          'direct-sidebar-accent': 'var(--direct-sidebar-accent)',

        },
        colors: {
          "unfocus-grey": 'var(--unfocus-grey)',
          "main-bg": "var(--main-bg)",
          "opposite-bg": "var(--opposite-bg)",
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
          'bento-wrapper-radius': '37px',
          'bento-item-radius': '27px'
        },
        gap: {
          'bento-gap': '15px'
        },
        keyframes: {
          "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
      },
    },
    plugins: [require("tailwindcss-animate"), 
      require('tailwind-scrollbar'),
      function ({ addUtilities }) {
        const newUtilities = {
          '.mask-center-cover': {
            'mask-repeat': 'no-repeat',
            'mask-position': 'center',
            'mask-size': 'cover',
          },
        };
  
        addUtilities(newUtilities);
      },],
});

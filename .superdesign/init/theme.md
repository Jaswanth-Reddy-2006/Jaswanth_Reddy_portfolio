# Theme Context

## Tailwind Config (`tailwind.config.js`)

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        warmWhite: '#F8F6F2',
        mutedBlue: '#4A7C9E',
        deepEmerald: '#2D5F4F',
        softGray: '#E8E6E1',
        darkText: '#2C2C2C',
        lightText: '#5A5A5A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 4px 16px rgba(0, 0, 0, 0.06)',
        'soft-xl': '0 8px 24px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}
```

## Global Styles (`src/index.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --ease-cinematic: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-elastic: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-warmWhite text-darkText antialiased selection:bg-mutedBlue/20 selection:text-mutedBlue;
    overflow-x: hidden;
    overflow-y: auto;
  }
}

.grainy-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}
```

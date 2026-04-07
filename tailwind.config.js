/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT: '#E11D48', // Justice Red
          light: '#FB7185', // Soft Rose
          dark: '#9F1239', // Deep Crimson
          glow: '#F43F5E', // Neon Red
        },
        blue: {
          DEFAULT: '#2563EB', // Digital Blue
          light: '#60A5FA', // Sky Blue
          dark: '#1E40AF', // Royal Blue
          indigo: '#4F46E5', // Legal Indigo
        },
        ink: '#0A0A0A', // Pure Midnight
        void: '#000000', // Pitch Black
        raised: '#111111', // Elevated Layer
        float: '#1A1A1A', // Floating Layer
        surface: '#222222', // Surface Layer
        platinum: '#F1F5F9', // Pure White/Silver
        text: {
          primary: '#FFFFFF', // Pure White
          secondary: '#94A3B8', // Slate Grey
          tertiary: '#64748B', // Muted Blue-Grey
        },
        accent: {
          success: '#10B981', // Emerald
          error: '#E11D48', // Justice Red
          warning: '#F59E0B', // Amber
          info: '#3B82F6', // Blue
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      boxShadow: {
        'hard': '8px 8px 0px 0px rgba(0,0,0,0.5)',
        'hard-lg': '12px 12px 0px 0px rgba(0,0,0,0.5)',
        'hard-red': '8px 8px 0px 0px rgba(225, 29, 72, 0.4)',
        'hard-blue': '8px 8px 0px 0px rgba(37, 99, 235, 0.4)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
    },
  },
  plugins: [],
}

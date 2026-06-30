import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#000000',
          surface: '#0A0A0A',
          card: '#111111',
          elevated: '#1A1A1A',
        },
        accent: {
          DEFAULT: '#9EFB9C',
          dim: '#7DD97B',
          glow: '#9EFB9C',
        },
        // Deep green-tinted charcoal "slab" surface for the tool-stack /
        // revenue-systems sections — a small tonal step off pure black so the
        // band reads as distinct while staying cohesive with the black+mint scheme.
        surface: {
          slab: '#0A0F0D',
          slabCard: '#10160F',
        },
        tier: {
          basic: '#9EFB9C',
          standard: '#4FB6E8',
          bespoke: '#FF6B5C',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A1A1A1',
          muted: '#8A8A8A',
        },
        border: {
          subtle: '#1F1F1F',
          DEFAULT: '#2A2A2A',
        },
      },
      fontFamily: {
        display: ['"Geist"', 'system-ui', 'sans-serif'],
        body: ['"Manrope"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      screens: {
        xs: '360px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      animation: {
        'marquee-vertical': 'marquee-v 18s linear infinite',
        'marquee-h': 'marquee-h 40s linear infinite',
        'marquee-h-rev': 'marquee-h-rev 50s linear infinite',
        'spin-slow': 'spin 12s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'fade-in': 'fade-in 0.6s ease-out both',
      },
      keyframes: {
        'marquee-v': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-50%)' },
        },
        'marquee-h': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'marquee-h-rev': {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(158,251,156,0.2), 0 8px 30px -6px rgba(158,251,156,0.18)',
      },
    },
  },
  plugins: [],
} satisfies Config;

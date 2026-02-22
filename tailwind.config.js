/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: { DEFAULT: '#2563eb', light: '#3b82f6', dark: '#1d4ed8' },
                teal: { DEFAULT: '#0ea5e9' },
                brand: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    900: '#1e3a8a',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Syne', 'sans-serif'],
            },
            backgroundImage: {
                'hero-gradient': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(37,99,235,0.3), transparent)',
                'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0))',
            },
            boxShadow: {
                'glow': '0 0 40px rgba(37,99,235,0.25)',
                'glow-sm': '0 0 20px rgba(37,99,235,0.15)',
            },
            borderRadius: { '3xl': '1.5rem', '4xl': '2rem' },
            animation: {
                'fade-up': 'fadeUp 0.6s ease-out forwards',
                'fade-in': 'fadeIn 0.4s ease-out forwards',
                'float': 'float 4s ease-in-out infinite',
                'pulse-slow': 'pulse 4s ease-in-out infinite',
            },
            keyframes: {
                fadeUp: { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
                fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
                float: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
            }
        },
    },
    plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['selector', '[data-theme="dark"]'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
            },
            colors: {
                accent: {
                    DEFAULT: '#C4FF89',
                    50: '#F4FFE6',
                    100: '#EAFFD4',
                    200: '#D4FF9F',
                    300: '#C4FF89',
                    400: '#A8E06E',
                    500: '#C4FF89',
                    600: '#8BBF5C',
                    700: '#6B993F',
                    800: '#4A7325',
                    900: '#2B4D10',
                },
                cyan: {
                    DEFAULT: '#4DB8FF',
                    400: '#7ACBFF',
                    500: '#4DB8FF',
                    600: '#2AA3F0',
                },
                magenta: {
                    DEFAULT: '#FF9FFC',
                    400: '#FFB8FD',
                    500: '#FF9FFC',
                    600: '#E87BE5',
                },
                coral: {
                    DEFAULT: '#FFB5AB',
                    400: '#FFCEC7',
                    500: '#FFB5AB',
                    600: '#E89488',
                },
            },
            animation: {
                'fade-in': 'fade-in 0.3s ease-out',
                'slide-up': 'slide-up 0.3s ease-out',
                'pulse-slow': 'pulse 3s ease-in-out infinite',
            },
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'slide-up': {
                    '0%': { opacity: '0', transform: 'translateY(8px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
};

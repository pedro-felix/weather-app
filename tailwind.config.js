/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            fontFamily: {
                'poppins': ['Poppins'],
            },
            backgroundImage: {
                'toggle-dark': 'url(\'/src/assets/toggle-dark.svg\')',
                'toggle-light': 'url(\'/src/assets/toggle-light.svg\')'
            },
            gridTemplateColumns: {
                '2auto': 'repeat(2, minmax(0, max-content))',
                '3auto': 'repeat(3, minmax(0, max-content))'
            },
            boxShadow: {
                'right-box': '8px 0 8px -10px #000000',
                'right-box-dark': '8px 0 8px -10px #fff'
            },
            animation: {
                'spin-slow': 'spin 3s ease infinite'
            }
        },
    },
    plugins: [],
    darkMode: 'class'
};


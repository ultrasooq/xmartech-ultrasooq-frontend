/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-orange': '#DB2302',
        'dark-cyan': '#022335',
        'light-gray': '#7b7b7b',
        'olive-green': '#669d03',
        'color-dark': '#333',
        'color-blue': '#1d77d1',
        'color-yellow': "#FCB800",
      },
      screens: {

        'xl': '1140px',

        '2xl': '1140px',
      },
      fontFamily: {
        body_text: ["Work Sans", "sans-serif"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

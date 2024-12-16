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
        primary: '#3A506B',
        secondary: '#5BC0BE',
        accent: '#FFA62B',
        background: '#F0F4F8',
        text: '#1C2541',
      },
    },
  },
  plugins: [],
}


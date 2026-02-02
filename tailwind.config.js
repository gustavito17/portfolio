/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sequel: ['Sequel', 'sans-serif'],
        questrial: ['Questrial', 'sans-serif'],
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1025px',  // Cambiado de 1024px a 1025px para separar claramente tablet de escritorio
        'xl': '1400px',  // Definido para pantallas más grandes
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};

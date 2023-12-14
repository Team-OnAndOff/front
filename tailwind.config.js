/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  important: true,
  theme: {
    extend: {
      // text
      fontSize: {
        'size-title': '1.5rem',
        'size-body': '1rem',
        'size-subbody': '0.75rem',
      },
      // rounded
      //  TODO: rem으로
      borderRadius: {
        'button-radius': '12px',
        'big-radius': '16px',
        'small-radius': '6px',
        'image-radius': '10px',
      },
      // w
      spacing: {
        'big-button': '10rem',
        'small-button': '5rem',
      },
      // bg, text...
      colors: {
        // 메인컬러 오렌지색
        'main-color': '#ff5e2e',
        'main-hover-color': '#d94e25',
        'main-light-color': '#fff5f2',

        // 서브컬러 초록색
        'sub-color': '#3a823f',

        'black-color': '#111111',
        'light-gray-color': '#f2efef',
        'dark-gray-color': '#999999',
      },
    },
  },
  plugins: [],
}

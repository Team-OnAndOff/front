/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  important: true,
  theme: {
    extend: {
      fontSize: {
        'size-title': '1.5rem',
        'size-body': '1rem',
        'size-subbody': '0.75rem',
      },
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

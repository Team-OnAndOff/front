/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  important: true,
  theme: {
    extend: {
      // text
      fontSize: {
        'size-title': ['1.5rem', '2rem'],
        'size-body': ['1rem', '1.5rem'],
        'size-subbody': ['0.75rem', '1rem'],
      },
      // rounded
      borderRadius: {
        'button-radius': '0.75rem',
        'big-radius': '1rem',
        'small-radius': '0.375rem',
        'image-radius': '0.625rem',
      },
      // w
      spacing: {
        'big-button': '10rem',
        'small-button': '5rem',
        // 'common-screen-width': '1120px',
        'common-screen-width': '1160px',
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

      screens: {
        tablet: '768px',
        // => @media (min-width: 768px)
        desktop: '1120px',
        // => @media (min-width: 1120px)
      },
    },
  },
  plugins: [],
}

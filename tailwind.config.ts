import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#fff',
        'gray-050': '#fafafa',
        'gray-100': '#f5f5f5',
        'gray-200': '#eeeef0',
        'gray-300': '#e2e3e6',
        'gray-400': '#c6c8cc',
        'gray-500': '#a0a4a8',
        'gray-600': '#7e8185',
        'gray-700': '#555759',
        'gray-800': '#3f4142',
        'gray-900': '#242526',
        black: '#000',

        'indigo-500': '#7e84bb',
        'indigo-800': '#424a81',

        'bluegray-100': '#dee4e9',
        'bluegray-300': '#96a7b5',
        'bluegray-700': '#415362',
        'bluegray-800': '#2d3b45',
        'bluegray-900': '#283036',

        'violet-100': '#efeeff',
        'violet-200': '#e2d9fc',
        'violet-500': '#8710ff',
        'violet-blue-500': '#6e6efb',

        'purple-500': '#ab5ccf',

        'deeppurple-200': '#e4cbff',
        'deeppurple-400': '#9978b0',
        'deeppurple-600': '#644973',

        'wine-400': '#ac78a4',
        'wine-900': '#6f4068',

        'pink-200': '#ffeef6',
        'pink-300': '#ffebf6',
        'pink-400': '#fbe2ee',
        'pink-500': '#ff5fc7',
        'pink-800': '#a00372',

        'red-200': '#ffdce2',
        'red-500': '#ff5d7a',
        'red-900': '#9b2727',

        'gold-200': '#f6dea2',
        'gold-400': '#d1b46d',
        'gold-600': '#9a8654',
        'gold-700': '#857140',

        'yellow-200': '#fff8d3',
        'yellow-400': '#ffe967',
        'yellow-500': '#ffd31a',
        'yellow-600': '#ffdc1c',

        'amber-100': '#ffedbc',
        'amber-500': '#f3a528',
        'amber-800': '#805626',

        'darkteal-100': '#dcf0ec',
        'darkteal-200': '#cbf1e8',
        'darkteal-500': '#7e97bb',
        'darkteal-700': '#4f6682',

        'skyblue-100': '#dff3ff',
        'skyblue-500': '#3fa9d9',

        'lightgreen-700': '#476c16',

        'mediumblue-500': '#3d41cd',
        'green-500': '#4fcc9c',

        blue: '#007bff',
        indigo: '#6610f2',
        purple: '#6f42c1',
        pink: '#ff5fc7',
        red: '#ff5d7a',
        orange: '#fd7e14',
        yellow: '#ffd31a',
        green: '#4fcc9c',
        teal: '#20c997',
        cyan: '#17a2b8',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from 'tailwindcss';
function generateGridColumns(lastValue: number) {
	let obj: any = {};
	for (let i = 13; i < lastValue; i++) {
		obj[`${i}`] = `repeat(${i}, minmax(0, 1fr))`;
	}
	return obj;
}

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: 'class',
	theme: {
		screens: {
			xm: '450px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px',
		},
		extend: {
			colors: {
				primary: {
					'dark-100': '#112240',
					'dark-200': '#0a192f',
					'black-thin': '#00000029',
					'black-light': '#333333',
					'black-dark': '#000000',
					'blue-light': '#32373F',
					'gold-light': '#CDAB47',
					'orange-dark': '#ff7000',
					'orange-light': '#e2995f',
				},
			},
			container: {
				center: true,
				padding: '1rem',
				screens: {
					sm: '600px',
					md: '728px',
					lg: '984px',
					xl: '1240px',
					'2xl': '1280px',
				},
			},
			gridTemplateColumns: {
				...generateGridColumns(24),
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};
export default config;

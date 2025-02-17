import type { Config } from "tailwindcss";

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
	  './pages/**/*.{ts,tsx}',
	  './components/**/*.{ts,tsx}',
	  './app/**/*.{ts,tsx}',
	  './src/**/*.{ts,tsx}',
	],
	theme: {
	  extend: {
		colors: {
			// Color primitives
			'app-white': 'rgb(255 255 255 / <alpha-value>)',
			'app-gray-50': 'rgb(249 249 249 / <alpha-value>)',
			'app-gray-300': 'rgb(204 204 204 / <alpha-value>)',
			'app-gray-600': 'rgb(153 153 153 / <alpha-value>)',
			'app-black': 'rgb(0 0 0 / <alpha-value>)',
			'app-black-4': 'rgb(0 0 0 / 0.04)',
			'app-green': 'rgb(40 192 97 / <alpha-value>)',
			'app-red': 'rgb(255 0 0 / <alpha-value>)',
			'app-yellow': 'rgb(255 191 0 / <alpha-value>)',
			
			// Surface colors
			'surface-background': 'rgb(255 255 255 / <alpha-value>)',
			'surface-main': 'rgb(249 249 249 / <alpha-value>)',
			'surface-dropdowns': 'rgb(0 0 0 / 0.04)',
			'surface-backdrops': 'rgb(0 0 0 / 0.2)',
			
			// Fill colors
			'fill-primary': 'rgb(0 0 0 / <alpha-value>)',
			'fill-primary-hover': 'rgb(204 204 204 / <alpha-value>)',
			'fill-secondary': 'rgb(0 0 0 / 0.04)',
			'fill-secondary-emphasis': 'rgb(255 255 255 / <alpha-value>)',
			'fill-secondary-hover': 'rgb(255 255 255 / <alpha-value>)',

			// Border colors
			'border-default': 'rgb(0 0 0 / 0.04)',
			
			// Text colors
			'text-primary': 'rgb(0 0 0 / <alpha-value>)',         
			'text-secondary': 'rgb(153 153 153 / <alpha-value>)', 
			'text-tertiary': 'rgb(204 204 204 / <alpha-value>)',  
			'text-primary-button': 'rgb(255 255 255 / <alpha-value>)', 
			'text-secondary-button': 'rgb(0 0 0 / <alpha-value>)',
			'text-green': 'rgb(40 192 97 / <alpha-value>)',      
			'text-red': 'rgb(255 0 0 / <alpha-value>)',          
			'text-yellow': 'rgb(255 191 0 / <alpha-value>)',     
			
			// Icon colors
			'icon-white': 'rgb(255 255 255 / <alpha-value>)',      
			'icon-primary': 'rgb(0 0 0 / <alpha-value>)',          
			'icon-secondary': 'rgb(153 153 153 / <alpha-value>)',  
			'icon-secondary-hover': 'rgb(204 204 204 / <alpha-value>)', 
			'icon-tertiary': 'rgb(204 204 204 / <alpha-value>)',   
			'icon-tertiary-hover': 'rgb(0 0 0 / <alpha-value>)',   
			'icon-green': 'rgb(40 192 97 / <alpha-value>)',        
			'icon-red': 'rgb(255 0 0 / <alpha-value>)',           
			'icon-yellow': 'rgb(255 191 0 / <alpha-value>)',      
		},
		borderRadius: {
		  lg: "var(--radius)",
		  md: "calc(var(--radius) - 2px)",
		  sm: "calc(var(--radius) - 4px)",
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
   } satisfies Config;

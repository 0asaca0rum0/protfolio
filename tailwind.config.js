/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			backgroundImage: {
				backgorund: "url('ccchaos.svg')",
				background2: "url('vite.svg')",
			},
			animation: {
				"spin-slow": "spin 3s linear infinite",
				wiggle: "shake 1s ease-in-out infinite",
			},
		},
	},
	plugins: [],
};

/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
    	extend: {

    		animation: {
    			'spin-slow': 'spin 3s linear infinite',
    			'spin-slow-reverse': 'spin 4s linear infinite reverse',
    			wiggle: 'shake 1s ease-in-out infinite',
    			'pulse-x': 'pulseX 1.5s infinite',
    			'pulse-x-reverse': 'pulseXReverse 1.5s infinite',
    			float: 'float 4s ease-in-out infinite',
    			breathe: 'breathe 4s ease-in-out infinite',
    			'subtle-glow': 'subtle-glow 3s ease-in-out infinite',
    		},
    		keyframes: {
    			pulseX: {
    				'0%, 100%': {
    					transform: 'translateX(0)'
    				},
    				'50%': {
    					transform: 'translateX(3px)'
    				}
    			},
    			pulseXReverse: {
    				'0%, 100%': {
    					transform: 'translateX(0)'
    				},
    				'50%': {
    					transform: 'translateX(-3px)'
    				}
    			},
    			float: {
    				'0%, 100%': {
    					transform: 'translateY(0)'
    				},
    				'50%': {
    					transform: 'translateY(-5px)'
    				}
    			},
    			breathe: {
    				'0%, 100%': {
    					transform: 'scale(1)'
    				},
    				'50%': {
    					transform: 'scale(1.03)'
    				}
    			},
    			'subtle-glow': {
    				'0%, 100%': {
    					opacity: 0.3,
    					filter: 'blur(8px)'
    				},
    				'50%': {
    					opacity: 0.7,
    					filter: 'blur(10px)'
    				}
    			}
    		},
    		spacing: {
    			'18': '4.5rem',
    			'4.5': '1.125rem',  // Added
    			'7.5': '1.875rem',  // Added
    			'13': '3.25rem',    // Added
    			'22': '5.5rem',     // Added
    		},
    		screens: {
    			xs: '480px'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		}
    	}
    },
	plugins: [require("tailwindcss-animate")],
});

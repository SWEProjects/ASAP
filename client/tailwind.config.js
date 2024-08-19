/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        }
      },
      animation: {
        slideDown: 'slideDown 0.5s ease-out forwards',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        poppins : ['Poppins', 'serif']
      },
      colors: {
        info: '#3498db',
        infohover: "hsl(207, 50%, 53%)",
      },
      
    },
  },
  plugins: [
    require('daisyui'),
  ],
}


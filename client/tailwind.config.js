/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        background:"#F8F8F8",
         primary: {
          'white': '#ffffff',
          'black': '#1b1b1b',
          'nav': "#001529",
          'button':"#1890FF",
          'danger':"#F51D2C",
          'searchbar':"#E5F0FF",
        },
        card:{
          'budget':"#00000000",
          'clients':"#1BC5BD",
          'employee':"#1890FF",
          'projects':"#181C32",
        },
        status:{
          'active':"#14AE5C",
          'restricted':"#F9AC1A",
          'deactivated':"#F51D2C"
        },
        chart:{
          'core':"#D570AD",
          "capacity":"#89C052",
          "capital":"#F3B948"
        },
        budgetStatus:{
          "on":"#14AE5C",
          "over":"#F51D2C",
          "under":"#F9AC1A"
        },
        divider:"#D9D9D9",
        alert:{
          "danger":"#FFF1F0",
          "warning":"#FCE9AF",
          "success":"#14AE5C",
        }
      },
      textColor:{
        primary:{
          'title':"#1890FF",
          'grey':"#7B7B7B",
          'danger':"#F51D2C",
          'green':"#14AE5C",
        }
      }
    },
  },
  plugins: [
  ],
   corePlugins: {
    preflight: false,
  }
}

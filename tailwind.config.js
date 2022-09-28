/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      screens: {
        fullHD: '1700px',
      },
      fontFamily: {
        body: ['Poppins'],
      },
      fontSize: {
        '2xs': ['11px', {
          letterSpacing: '0.00em',
          lineHeight: '1.2',
        }]},
      backgroundImage: {
        'auction': "url('../assets/auction.svg')",
        'dashboard': "url('../assets/dashboard.svg')",
        'logout': "url('../assets/logout.svg')",
        'wallet': 'url("../assets/wallet.svg")',
        'icon-search': "url('../assets/icon-search.svg')",
        'heart': 'url("../assets/heart.svg")',
        'trash': 'url("../assets/trash.svg")',
        'lupa': 'url("../assets/lupa.svg")',
        'x': 'url("../assets/x.svg")',
        'save': 'url("../assets/save.svg")',
        '+': 'url("../assets/mais.svg")',
        'clock-time': 'url("../assets/clock-time.svg")',
        'checkmark': 'url("../assets/checkmark.svg")',
        'x-grey': 'url("../assets/x-grey.svg")',
        'live': 'url("../assets/live.svg")',
        'selectedNavbar': 'url("../assets/selectedNavbar.svg")',
        'menu-black': 'url("../assets/menu-black.svg")',
        'menu-white': 'url("../assets/menu-white.svg")',
        'lupa-white': 'url("../assets/lupa-white.svg")',
        'edit-white': 'url("../assets/edit-white.svg")',
      },
      colors: {},
      borderRadius: {
        md: '0.25rem',
      },
    },
  },
  plugins: [],
};

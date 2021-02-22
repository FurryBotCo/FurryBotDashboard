module.exports = {
  purge: ['./src/**/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {},

    backgroundColor: {
      primary: '#333333',
      navbar: '#1A150E'
    }
  },
  variants: {
    backgroundColor: ['active']
  }
};

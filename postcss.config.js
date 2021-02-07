module.exports = {
  plugins: [
    ['@csstools/postcss-sass', { includePaths: ['./node_modules'] }],
    'postcss-import',
    'autoprefixer',
    'tailwindcss'
  ]
};

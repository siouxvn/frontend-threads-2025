module.exports = {
  extends: [require.resolve('@umijs/lint/dist/config/eslint')],
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};

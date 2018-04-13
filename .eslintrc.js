module.exports = {
  extends: ['airbnb-base', 'plugin:jest/recommended'],
  parser: 'babel-eslint',
  env: {
    jest: true,
    browser: false,
  },
  plugins: ['jest', 'import'],
  rules: {
    'linebreak-style': 0, // Because people use different line break style in different IDEs
    'import/no-extraneous-dependencies': [2, { 'devDependencies': true }], // Should be allowed to reference devDependencies (e.g. in tests)
    'import/prefer-default-export': 0, // Annoying and unnecessary :)
    'camelcase': 0, // GitHub delivers snake_case properties
  }
};
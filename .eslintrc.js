module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  plugins: ['react'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'import/prefer-default-export': 'off',
    'comma-dangle': 'off',
    semi: 0,
    'linebreak-style': 'off',
    'no-console': 'off',
    'prefer-rest-params': 'off',
    'no-useless-constructor': 'off',
    'class-methods-use-this': 'off',
    'react/jsx-filename-extension': 'off',
    'arrow-parens': 'off'
  }
}
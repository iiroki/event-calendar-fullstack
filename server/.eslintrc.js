module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },

  extends: [
    'airbnb-base',
  ],

  parserOptions: {
    ecmaVersion: 2018,
  },

  rules: {
    semi: [
      'error',
      'never'
    ],
    'arrow-parens': [
      'error',
      'as-needed'
    ],
    'comma-dangle': 'off',
    'no-console': 'off'
  }
}

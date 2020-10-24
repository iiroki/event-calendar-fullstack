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
    'comma-dangle': 'off',
    'no-console': 'off'
  }
}

module.exports = {
  env: {
    browser: true,
    es6: true
  },

  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],

  parser: 'babel-eslint',

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },

  plugins: [
    'react',
    'react-hooks'
  ],

  rules: {
    'react/jsx-filename-extension': [
      1, { 'extensions': ['.js', '.jsx'] }
    ],
    'react/prop-types': 'off',
    semi: [
      'error',
      'never'
    ],
    'jsx-quotes': [
      2,
      'prefer-single'
    ],
    'arrow-parens': [
      'error',
      'as-needed'
    ],
    'comma-dangle': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'jsx-a11y/label-has-associated-control': [
      2, {
        controlComponents: ['textarea', 'button']
      }
    ]
  }
}

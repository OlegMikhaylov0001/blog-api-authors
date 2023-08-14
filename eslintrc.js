module.exports = {
  plugins: ['react', 'react-hooks'],
  extends: ['eslint:recommended', 'plugin:react/recommended'],

  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'error',

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },

  settings: {
    react: {
      version: 'detect',
    },
  },
};

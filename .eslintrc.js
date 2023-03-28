// prettier-ignore
module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  globals: {
    JSX: 'readonly',
    AbortController: 'readonly'
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js'],
      rules: {
        'prettier/prettier': 'off',
        '@typescript-eslint/no-shadow': ['off'],
        'no-shadow': 'error',
        'no-undef': 'error',
        'no-unused-vars': 'error',
        'comma-dangle': ['error', 'never'],
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'jsx-quotes': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'eol-last': 'off',
        'react-hooks/rules-of-hooks': 'warn'
      }
    }
  ]
};

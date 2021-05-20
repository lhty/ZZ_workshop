module.exports = {
  env: {
    browser: true,
  },
  extends: ['airbnb', 'airbnb/hooks', 'react-app', 'prettier', 'prettier/react'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier', 'react', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    'no-console': 'warn',
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx', '.ts', '.js'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
      },
    ],
    'no-return-assign': 2,
    'no-param-reassign': 0,
    'no-extra-parens': 0,
    'import/prefer-default-export': 0,
    'react/require-default-props': 0,
    'react/prop-types': [0, { ignore: ['children', 'className'] }],
    'no-shadow': 'off',
    'react/jsx-props-no-spreading': [
      0,
      {
        html: 'ignore',
      },
    ],
    camelcase: 'off',
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      },
    },
  },
};

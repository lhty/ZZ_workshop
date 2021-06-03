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
    'consistent-return': ['off', { treatUndefinedAsUnspecified: false }],
    'react/jsx-props-no-spreading': [
      0,
      {
        html: 'ignore',
      },
    ],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'import/no-anonymous-default-export': [
      'error',
      {
        allowArray: true,
        allowArrowFunction: false,
        allowAnonymousClass: false,
        allowAnonymousFunction: false,
        allowCallExpression: true, // The true value here is for backward compatibility
        allowLiteral: false,
        allowObject: false,
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

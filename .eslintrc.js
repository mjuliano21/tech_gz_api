module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'spaced-comment': 'off',
    'class-methods-use-this': 'off',
    'linebreak-style': 'off',
    'consistent-return': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
  },
};

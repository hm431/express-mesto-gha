module.exports = {
  env: {
    es2021: true,
  },
  extends: ['airbnb', 'airbnb-base'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
        '_id*/**/**',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-underscore-dangle': [
      'error',
      {
        allow: '_id',
      },
    ]
  }
};

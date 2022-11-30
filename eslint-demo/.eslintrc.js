module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: 'eslint:recommended',
  rules: {
    // semi: ['error', 'always'],
  },
  // 不指定的话 会向父目录找 一直到根目录或者用户的家目录
  root: true,
}

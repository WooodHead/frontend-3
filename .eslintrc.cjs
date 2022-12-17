module.exports = {
  extends: [
    '@antfu',
    'plugin:vue/vue3-recommended',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  plugins: [
    'unused-imports',
  ],
  rules: {
    // 有时需要将 props 的 interface 定义放在最前面
    'vue/define-macros-order': [
      'off',
    ],
    // 有时会把 div 给封闭，没有必要
    'vue/html-self-closing': ['error', {
      html: {
        void: 'never',
        normal: 'any',
        component: 'always',
      },
      svg: 'always',
      math: 'always',
    }],
    // unocss 属性大多数时候需要多个属性写在一行
    'vue/max-attributes-per-line': [
      'off',
    ],
    // 使用 reactivity transform 时，不用担心此问题
    'vue/no-setup-props-destructure': [
      'off',
    ],
    // 有时需要使用 index.vue 作为名称
    'vue/multi-word-component-names': [
      'off',
    ],
    'quotes': [
      'error',
      'single',
    ],
    'arrow-parens': [
      'error',
      'as-needed',
    ],
    'curly': [
      'error',
      'all',
    ],
    'max-statements-per-line': [
      'error',
      {
        max: 2,
      },
    ],
    'no-console': [
      'warn',
    ],

    // 自动删除未使用的 import
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
}

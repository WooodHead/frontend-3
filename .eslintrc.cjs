module.exports = {
  extends: [
    '@antfu',
    'plugin:vue/vue3-recommended',
    'prettier',
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
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'never',
          normal: 'any',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    // unocss 属性大多数时候需要多个属性写在一行
    'vue/max-attributes-per-line': [
      'off',
    ],
    // 使用 reactivity transform 时不用担心此问题
    'vue/no-setup-props-destructure': [
      'off',
    ],
    // 很多时候需要使用 index.vue 作为名称
    'vue/multi-word-component-names': [
      'off',
    ],
    // 模板中使用as时必须加括号，否则代码着色会出问题
    'vue/no-extra-parens': [
      'off',
    ],
    // 形如 select:event 这样的事件名称不需要驼峰
    'vue/custom-event-name-casing': [
      'off',
    ],
    'quotes': [
      'error',
      'single',
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
    'prefer-const': [
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

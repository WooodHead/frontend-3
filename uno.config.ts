import path from 'path'
import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'
import presetTheme from 'unocss-preset-theme'
import type { Theme } from '@unocss/preset-uno'
import parseIcons from './src/utils/parseIcons'
import parseArcoTheme from './src/utils/parseArcoTheme'

const parsedTheme = parseArcoTheme(
  path.join(__dirname, 'node_modules/@arco-themes/vue-project-chiral/theme.css'),
  path.join(__dirname, 'src/utils/arco-theme.json'),
)!
const parsedIcons = parseIcons(
  path.join(__dirname, 'src/assets/icons'),
)

export default defineConfig<Theme>({
  theme: {
    colors: {
      ...parsedTheme.light.colors,
    },
  },
  // 全局important
  preprocess: p => {
    if (p.includes('!') || p.includes('important') || p.includes('nim')) { return p }
    return `!${p}`
  },
  rules: [
    // 为了attributeify的兼容性而做出的必要的调整
    // TODO 行数太多了，缩减一下
    [/^w-(\d+)per$/, ([, percentage]) => ({ width: `${percentage}%` })],
    [/^min-w-(\d+)per$/, ([, percentage]) => ({ 'min-width': `${percentage}%` })],
    [/^max-w-(\d+)per$/, ([, percentage]) => ({ 'max-width': `${percentage}%` })],
    [/^h-(\d+)per$/, ([, percentage]) => ({ height: `${percentage}%` })],
    [/^min-h-(\d+)per$/, ([, percentage]) => ({ 'min-height': `${percentage}%` })],
    [/^max-h-(\d+)per$/, ([, percentage]) => ({ 'max-height': `${percentage}%` })],
    [/w-(\d+)-(\d+)$/, ([, a, b]) => ({ width: `${parseInt(a) / parseInt(b) * 100}%` })],
    [/min-w-(\d+)-(\d+)$/, ([, a, b]) => ({ 'min-width': `${parseInt(a) / parseInt(b) * 100}%` })],
    [/max-w-(\d+)-(\d+)$/, ([, a, b]) => ({ 'max-width': `${parseInt(a) / parseInt(b) * 100}%` })],
    [/h-(\d+)-(\d+)$/, ([, a, b]) => ({ height: `${parseInt(a) / parseInt(b) * 100}%` })],
    [/min-h-(\d+)-(\d+)$/, ([, a, b]) => ({ 'min-height': `${parseInt(a) / parseInt(b) * 100}%` })],
    [/max-h-(\d+)-(\d+)$/, ([, a, b]) => ({ 'max-height': `${parseInt(a) / parseInt(b) * 100}%` })],
  ],
  shortcuts: [
    {
      full: 'w-full h-full',
      fullscreen: 'w-screen h-screen',
    },
    {
      'column': 'flex flex-col',
      'row': 'flex flex-row',
      'center': 'flex items-center justify-center',
      'center-x': 'flex flex-row items-center',
      'center-y': 'flex flex-col items-center',
    },
    {
      'card': 'full bg-bg-1 rounded-lg shadow-lg',
      'card-border': 'card border-1 border-border-2',
    },
    {
      ellipsis: 'overflow-hidden text-ellipsis whitespace-nowrap',
    },
    // 取消默认!important
    [/^nim-(.+)$/, ([, p]) => p],
  ],
  safelist: [
    // col-start 1 到 5
    ...Array.from({ length: 5 }, (_, i) => `col-start-${i + 1}`),
    // col-end 1 到 5
    ...Array.from({ length: 5 }, (_, i) => `col-end-${i + 1}`),
    // row-start 1 到 5
    ...Array.from({ length: 5 }, (_, i) => `row-start-${i + 1}`),
    // row-end 1 到 5
    ...Array.from({ length: 5 }, (_, i) => `row-end-${i + 1}`),
    // col-span 1 到 5
    ...Array.from({ length: 5 }, (_, i) => `col-span-${i + 1}`),
    // row-span 1 到 5
    ...Array.from({ length: 5 }, (_, i) => `row-span-${i + 1}`),
  ],
  presets: [
    presetUno(),
    presetIcons({
      collections: {
        custom: {
          ...parsedIcons,
        },
      },
    }),
    presetRemToPx(),
    presetTypography(),
    // presetScrollbar({}), // scrollbar相关的属性兼容性有点差
    presetTheme<{}>({
      selectors: {
        light: 'body',
        dark: 'body.dark',
      },
      theme: {
        dark: {
          colors: {
            ...parsedTheme.dark.colors,
          },
        },
      },
    }),
    presetAttributify({
      strict: true,
      prefix: 'uno-',
    }),
  ],
})

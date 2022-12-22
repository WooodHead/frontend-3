import path from 'path'
import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'
import presetTheme from 'unocss-preset-theme'
import type { Theme } from '@unocss/preset-uno'
import parseArcoTheme from './src/utils/parseArcoTheme'

const parsed = parseArcoTheme(path.join(__dirname, 'node_modules/@arco-themes/vue-project-chiral/theme.css'))!

export default defineConfig<Theme>({
  theme: {
    colors: {
      ...parsed.light.colors,
    },
  },
  rules: [],
  shortcuts: [
    {
      full: 'w-full h-full',
    },
    {
      'column': 'flex flex-col',
      'row': 'flex flex-row',
      'center': 'flex items-center justify-center',
      'center-x': 'flex flex-row items-center',
      'center-y': 'flex flex-col items-center',
    },
    {
      card: 'full bg-bg-1 rounded-lg shadow-lg',
    },
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
    presetIcons(),
    presetRemToPx(),
    presetTypography(),
    presetTheme<{}>({
      theme: {
        dark: {
          colors: {
            ...parsed.dark.colors,
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

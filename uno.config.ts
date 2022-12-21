import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  preflights: [],
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
      'card-light': 'full bg-white rounded-lg shadow-lg',
      'card-dark': 'full bg-gray-700 rounded-lg shadow-lg',
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
    presetAttributify({
      strict: true,
      prefix: 'uno-',
    }),
  ],
})

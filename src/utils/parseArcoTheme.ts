import { readFileSync } from 'fs'
import css from 'css'

const parseColorVariables = (rule: css.Rule, init: Record<string, any> = {}) => {
  const declarations = rule.declarations as css.Declaration[]

  const colors: Record<string, any> = init

  for (const d of declarations) {
    const property = d.property!.replace('--', '')
    const [name, variant] = property.split('-')
    if (!colors[name]) { colors[name] = {} }
    colors[name][variant] = `rgb(${d.value})`
  }

  return colors
}

const parseThemeColors = (rule: css.Rule, init: Record<string, any> = {}) => {
  const declarations = rule.declarations as css.Declaration[]

  const colors: Record<string, any> = init

  for (const { property: rawProperty, value } of declarations) {
    if (!rawProperty?.startsWith('--color-')) { continue }
    const property = rawProperty!.replace('--color-', '')

    const names = property.split('-')

    let target = colors
    for (const [i, name] of names.entries()) {
      if (typeof target[name] === 'string') {
        target[name] = { default: target[name] }
      }
      if (i === names.length - 1) {
        if (value?.includes('rgb') || value?.includes('neutral') || value?.startsWith('#')) {
          target[name] = value
        }
        else {
          target[name] = `rgb(${value})`
        }
      }
      else if (!target[name]) { target[name] = {} }
      target = target[name]
    }
  }

  return colors
}

const combine = (vars: Record<string, any>, theme: Record<string, any>) => {
  const result = { ...vars }

  for (const [name, value] of Object.entries(theme)) {
    if (!result[name]) {
      result[name] = value
    }
    else if (typeof value === 'string' && typeof result[name] === 'object') {
      result[name].default = value
    }
    else if (typeof value === 'object' && typeof result[name] === 'string') {
      result[name] = { default: result[name], ...value }
    }
    else if (typeof value === 'object' && typeof result[name] === 'object') {
      result[name] = combine(result[name], value)
    }
    else {
      throw new TypeError(`Unexpected type: ${name} ${typeof value} ${typeof result[name]}`)
    }
  }

  return result
}

export const parseArcoTheme = (filePath: string) => {
  const rawCSS = readFileSync(filePath).toString()

  const { stylesheet } = css.parse(rawCSS)
  if (!stylesheet) { return undefined }
  const { rules } = stylesheet

  const lightThemeRule = rules[1] as css.Rule
  const darkThemeRule = rules[2] as css.Rule
  const lightColorRule = rules[3] as css.Rule
  const darkColorRule = rules[4] as css.Rule

  const lightTheme = parseThemeColors(lightThemeRule)
  const darkTheme = parseThemeColors(darkThemeRule)
  const lightColors = parseColorVariables(lightColorRule)
  const darkColors = parseColorVariables(darkColorRule)

  return {
    light: {
      colors: { ...combine(lightColors, lightTheme) },
    },
    dark: {
      colors: { ...combine(darkColors, darkTheme) },
    },
  }
}

export default parseArcoTheme

// import { readFileSync } from 'fs'
// import path from 'path'
// import css from 'css'

// const arcoTheme = readFileSync(path.join(__dirname, 'node_modules/@arco-themes/vue-project-chiral/theme.css')).toString()

// const parseColors = (rule: css.Rule) => {
//   const declarations = rule.declarations as css.Declaration[]

//   const colors: Record<string, Record<string, string>> = {}

//   for (const d of declarations) {
//     const property = d.property!.replace('--', '')
//     const [name, variant] = property.split('-')
//     if (!colors[name]) { colors[name] = {} }
//     colors[name][variant] = `rgb(${d.value})`
//   }

//   return colors

//   // const colors = Object.fromEntries(declarations.map(d => [
//   //   d.property?.replace('--', ''),
//   //   `rgb(${d.value})`,
//   // ] as [string, string]))

//   // return colors
// }

// const parseArcoThemes = (rawCss: string) => {
//   const { stylesheet } = css.parse(rawCss)
//   if (!stylesheet) { return undefined }
//   const { rules } = stylesheet

//   const lightRule = rules[3] as css.Rule
//   const darkRule = rules[4] as css.Rule

//   return {
//     light: {
//       colors: parseColors(lightRule),
//     },
//     dark: {
//       colors: parseColors(darkRule),
//     },
//   }
// }

// const parsed = parseArcoThemes(arcoTheme)!
// console.log(parsed)


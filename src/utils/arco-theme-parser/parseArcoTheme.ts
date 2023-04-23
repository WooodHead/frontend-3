import { existsSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'
import css from 'css'
import { VarMap } from './var-map'
import { getNodeModulesPath, mapToTree, ruleToText } from './utils'

const toColor = (map: Map<string, string>) => {
  const result = new Map<string, string>()
  for (const key of map.keys()) {
    const value = map.get(key)!
    result.set(key, `rgb(${value})`)
  }
  return result
}

export const parseArcoTheme = (themeName: string, savePath?: string) => {
  const nodeModulesPath = getNodeModulesPath()
  if (!nodeModulesPath) {
    throw new Error('Can not find node_modules')
  }
  const themePath = path.join(nodeModulesPath, `@arco-themes/${themeName}`)
  const version = JSON.parse(
    readFileSync(path.join(themePath, 'package.json')).toString()
  ).version

  if (savePath && existsSync(savePath)) {
    const json = JSON.parse(readFileSync(savePath).toString())
    const prevVersion = json.version
    if (prevVersion === version) {
      return json
    }
  }

  const rawCSS = readFileSync(path.join(themePath, 'theme.css'))
    .toString()
    .replace(/\n/g, '')

  const { stylesheet } = css.parse(rawCSS)
  if (!stylesheet) {
    return undefined
  }
  const { rules } = stylesheet

  const lightThemeRule = rules[1] as css.Rule
  const darkThemeRule = rules[2] as css.Rule
  const lightColorRule = rules[3] as css.Rule
  const darkColorRule = rules[4] as css.Rule

  const lightColorMap = new VarMap(ruleToText(rawCSS, lightColorRule))
  const darkColorMap = new VarMap(ruleToText(rawCSS, darkColorRule), [
    lightColorMap,
  ])
  const lightThemeMap = new VarMap(ruleToText(rawCSS, lightThemeRule), [
    lightColorMap,
  ])
  const darkThemeMap = new VarMap(
    ruleToText(
      rawCSS.replace(/var\(--color-neutral-(.+?)\)/g, 'rgb(var(--gray-$1))'),
      darkThemeRule
    ),
    [darkColorMap, lightThemeMap]
  )

  const lightColorTree = mapToTree(toColor(lightColorMap.solved))
  const darkColorTree = mapToTree(toColor(darkColorMap.solved))
  const lightThemeTree = mapToTree(lightThemeMap.solved).color
  const darkThemeTree = mapToTree(darkThemeMap.solved).color

  const result = {
    version,
    light: {
      ...lightColorTree,
      ...lightThemeTree,
    },
    dark: {
      ...darkColorTree,
      ...darkThemeTree,
    },
  }

  if (savePath) {
    writeFileSync(savePath, JSON.stringify(result))
  }

  return result
}

export default parseArcoTheme

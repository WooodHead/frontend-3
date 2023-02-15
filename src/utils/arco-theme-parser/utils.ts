import path from 'path'
import { existsSync } from 'fs'
import type css from 'css'

export const mapToTree = (map: Map<string, string>) => {
  const result: Record<string, any> = {}
  for (const [path, value] of map) {
    const paths = path.split('-')
    let current = result
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i]
      if (!current[path]) {
        current[path] = i === paths.length - 1 ? value : {}
      }
      else if (typeof current[path] === 'string') {
        current[path] = { default: current[path] }
      }
      else if (typeof current[path] === 'object') {
        if (i === paths.length - 1) {
          current[path].default = value
        }
      }
      current = current[path]
    }
  }

  return result
}

export const ruleToText = (text: string, rule: css.Rule) => text.slice(
  rule.position?.start?.column ?? 0 - 1,
  rule.position?.end?.column ?? 0 - 1,
)

export const getNodeModulesPath = (root = __filename): string | undefined => {
  const expectPath = path.join(root, 'node_modules')
  if (existsSync(expectPath)) {
    return expectPath
  }
  else {
    const parent = path.dirname(root)
    if (parent === root) {
      return undefined
    }
    else {
      return getNodeModulesPath(parent)
    }
  }
}

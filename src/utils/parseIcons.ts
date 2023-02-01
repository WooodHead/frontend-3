import { existsSync, readFileSync, readdirSync } from 'fs'

export const parseIcons = (path: string) => {
  if (!existsSync(path)) { throw new Error(`Path ${path} does not exist`) }

  const icons = readdirSync(path).filter(name => name.endsWith('.svg'))

  return Object.fromEntries(icons.map(name => [
    name.replace('.svg', ''),
    readFileSync(`${path}/${name}`, 'utf-8').toString(),
  ]))
}

export default parseIcons

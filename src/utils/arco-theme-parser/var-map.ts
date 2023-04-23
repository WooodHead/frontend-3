const VAR_EXP = /var\(--(.+?)\)/
const VAR_DEF_EXP = /--(.+?): (.+?);/g

export class VarMap {
  solved: Map<string, string>
  unsolved = new Map<string, { text: string; var: string }>()

  extra: Map<string, string>[]

  constructor(text: string, extra: VarMap[] = []) {
    this.solved = new Map<string, string>()
    this.extra = extra.map((m) => m.solved)

    const success = this._parse(text)
    if (!success) {
      throw new Error(`${Array.from(this.unsolved.keys())}`)
    }
  }

  _parse(text: string) {
    const defs = text.matchAll(VAR_DEF_EXP)
    if (!defs) {
      return
    }

    for (const def of defs) {
      const [, name, value] = def
      const match = value.match(VAR_EXP)
      if (match) {
        this.unsolved.set(name, {
          text: value.replace(VAR_EXP, '$'),
          var: match[1].replace(/^--/, ''),
        })
      } else {
        this.solved.set(name, value)
      }
    }

    return this._resolve()
  }

  _get(key: string) {
    for (const m of [this.solved, ...this.extra]) {
      const value = m.get(key)
      if (value) {
        return value
      }
    }
  }

  _resolve() {
    let count: number
    do {
      count = 0
      for (const [name, { text, var: varName }] of this.unsolved.entries()) {
        const varValue = this._get(varName)
        if (!varValue) {
          continue
        }
        this.solved.set(name, text.replace('$', varValue))
        this.unsolved.delete(name)
        count += 1
      }
    } while (count !== 0)

    return this.unsolved.size === 0
  }
}

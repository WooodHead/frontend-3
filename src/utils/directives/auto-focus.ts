import type { Directive } from 'vue'

export const AutoFocus: Directive<HTMLElement> = {
  mounted: el => {
    el.focus()
  },
}

export default AutoFocus

import type { Directive } from 'vue'

const ClickOutsideFn: {
  [k: string]: ((e: MouseEvent) => void)
} = {}

export const ClickOutside: Directive<HTMLElement> = {
  mounted: (el, binding) => {
    ClickOutsideFn[el.id] = (e: MouseEvent) => {
      if (el !== e.target && !el.contains(e.target as Node)) {
        binding.value(e, el)
      }
    }
    document.addEventListener('click', ClickOutsideFn[el.id])
  },

  unmounted: el => {
    document.removeEventListener('click', ClickOutsideFn[el.id])
    delete ClickOutsideFn[el.id]
  },
}

export default ClickOutside

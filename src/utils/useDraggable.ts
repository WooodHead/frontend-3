import type { MaybeComputedRef } from '@vueuse/shared'
import { toRefs } from '@vueuse/shared'

export interface Position {
  x: number
  y: number
}

export interface UseDraggableOptions {
  onMove?: (position: Position, event: PointerEvent) => void

  onEnd?: (position: Position, event: PointerEvent) => void
}

const useDraggable = (
  target: MaybeComputedRef<HTMLElement | SVGElement | null | undefined>,
  options: UseDraggableOptions = {},
) => {
  const start = ref<Position>()
  const delta = ref<Position>({ x: 0, y: 0 })

  const { onMove, onEnd } = options

  const handleStart = (e: PointerEvent) => {
    start.value = { x: e.clientX, y: e.clientY }
  }

  const handleMove = (e: PointerEvent) => {
    if (!start.value) { return }

    const { x, y } = start.value
    delta.value = { x: e.clientX - x, y: e.clientY - y }

    onMove?.(delta.value, e)
  }

  const handleEnd = (e: PointerEvent) => {
    if (onEnd && delta.value) { onEnd(delta.value, e) }

    start.value = undefined
    delta.value = { x: 0, y: 0 }
  }

  useEventListener(target, 'pointerdown', handleStart, true)
  useEventListener(document, 'pointermove', handleMove, true)
  useEventListener(document, 'pointerup', handleEnd, true)

  return {
    ...toRefs(delta),
    isDragging: computed(() => start.value !== undefined),
  }
}
export default useDraggable

import type { MaybeComputedRef } from '@vueuse/shared'
import { toRefs } from '@vueuse/shared'

export interface Position {
  x: number
  y: number
}

export interface UseDraggableOptions {
  minDistance?: number
  onMove?: (position: Position, event: PointerEvent) => void
  onEnd?: (position: Position, event: PointerEvent) => void
}

export const useDraggable = (
  target: MaybeComputedRef<HTMLElement | SVGElement | null | undefined>,
  { onMove, onEnd, minDistance = 5 }: UseDraggableOptions = {},
) => {
  let start = $ref<Position>()
  let delta = $ref<Position>({ x: 0, y: 0 })
  let isDragging = $ref(false)

  const handleStart = (e: PointerEvent) => {
    e.preventDefault()
    start = { x: e.clientX, y: e.clientY }
  }

  const handleMove = (e: PointerEvent) => {
    if (!start) { return }
    const { x, y } = start
    const nowDelta = { x: e.clientX - x, y: e.clientY - y }

    if (isDragging) { delta = nowDelta }
    // 拖动距离过短时不触发拖动
    else if (Math.abs(nowDelta.x) >= minDistance) {
      isDragging = true
      delta = nowDelta
    }

    onMove?.(delta, e)
  }

  const handleEnd = (e: PointerEvent) => {
    if (onEnd && delta) { onEnd(delta, e) }

    start = undefined
    isDragging = false
    delta = { x: 0, y: 0 }
  }

  useEventListener(target, 'pointerdown', handleStart, true)
  useEventListener(document, 'pointermove', handleMove, true)
  useEventListener(document, 'pointerup', handleEnd, true)

  return {
    ...toRefs($$(delta)),
    isDragging: $$(isDragging),
  }
}
export default useDraggable

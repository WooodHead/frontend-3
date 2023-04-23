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
  { onMove, onEnd, minDistance = 5 }: UseDraggableOptions = {}
) => {
  const start = ref<Position>()
  const delta = ref<Position>({ x: 0, y: 0 })
  const isDragging = ref(false)

  const handleStart = (e: PointerEvent) => {
    e.preventDefault()
    start.value = { x: e.clientX, y: e.clientY }
  }

  const handleMove = (e: PointerEvent) => {
    if (!start.value) {
      return
    }
    const { x, y } = start.value
    const nowDelta = { x: e.clientX - x, y: e.clientY - y }

    if (isDragging.value) {
      delta.value = nowDelta
    }
    // 拖动距离过短时不触发拖动
    else if (Math.abs(nowDelta.x) >= minDistance) {
      isDragging.value = true
      delta.value = nowDelta
    }

    onMove?.(delta.value, e)
  }

  const handleEnd = (e: PointerEvent) => {
    if (onEnd) {
      onEnd(delta.value, e)
    }

    start.value = undefined
    isDragging.value = false
    delta.value = { x: 0, y: 0 }
  }

  useEventListener(target, 'pointerdown', handleStart, true)
  useEventListener(document, 'pointerup', handleEnd, true)

  const cleanup = ref<() => void>()
  watch(start, (start) => {
    if (start) {
      cleanup.value = useEventListener(
        document,
        'pointermove',
        handleMove,
        true
      )
    } else {
      cleanup.value?.()
      cleanup.value = undefined
    }
  })

  return {
    ...toRefs(delta),
    isDragging,
  }
}
export default useDraggable

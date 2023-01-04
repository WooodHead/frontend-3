<script setup lang="ts">
import { Motion, Presence } from '@motionone/vue'
import { UnitIDRange } from '@project-chiral/unit-system'
import { useStore } from '../../store'
import UnitSelect from './unit-select.vue'
import EventSelect from './event-select.vue'
import useDraggable from '@/utils/useDraggable'

const { type } = defineProps<{
  type: 'event' | 'unit'
}>()

const emit = defineEmits<{
  (e: 'ok'): void
  (e: 'cancel'): void
}>()

const store = useStore()
let { subUnit, selectedEvents, selectedRange } = $(storeToRefs(store))

const show = $computed(() =>
  (type === 'event' && selectedEvents.length > 0)
 || (type === 'unit' && selectedRange.length > 0))

const target = ref<HTMLElement | null>(null)

const position = $ref({ x: 0, y: 0 })
const { x, y } = useDraggable(target, {
  onEnd: ({ x, y }) => {
    position.x += x
    position.y += y
  },
})

let visible = $ref(false)

const handleCancel = () => {
  selectedEvents = []
  selectedRange = []
}
const handleOk = () => {
  visible = true
}

const handleModalOk = () => {
  selectedEvents = []
  selectedRange = []
}

// TODO 添加时间提示和选择事件提示
</script>

<template>
  <Presence>
    <Motion
      v-show="show"
      ref="target"
      :style="{ transform: `translate(${position.x + x}px, ${position.y + y}px)` }"
      card
      column fixed m-auto left-0 right-0 bottom-10
      w-400px h-auto border="1 border-2"
      cursor-move z-100
      :initial="{ opacity: 0, scale: 0.5 }"
      :animate="{ opacity: 1, scale: 1 }"
      :exit="{ opacity: 0, scale: 0.5 }"
    >
      <div grow w-full center p-2>
        <UnitSelect v-if="type === 'unit'" />
        <EventSelect v-if="type === 'event'" />
      </div>
      <div row w-full>
        <AButton long type="text" status="danger" @click="handleCancel">
          取消
        </AButton>
        <AButton long type="text" @click="handleOk">
          完成
        </AButton>
      </div>
    </Motion>
  </Presence>
  <CreateEventModal
    v-if="visible"
    v-model:visible="visible"
    :init="UnitIDRange.fromUnitID(selectedRange[0], selectedRange[1])"
    @before-ok="handleModalOk"
  />
</template>

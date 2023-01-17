<script setup lang="ts">
import type { UnitIDRange } from '@project-chiral/unit-id'
import { useQueryClient } from '@tanstack/vue-query'
import { EVENT_HEIGHT, UNIT_WIDTH } from '../../const'
import { useStore } from '../../store'
import type { EventEntity } from '@/api/api-base'

export interface BlockProps {
  id: number
  range: UnitIDRange
  color: string
  type: 'ATOM' | 'COLLECTION'
}

const { id, range, color } = defineProps<BlockProps>()

const store = useStore()
const { viewPort } = storeToRefs(store)
const { visibleUnit, lock } = $(storeToRefs(store))

const client = useQueryClient()

let visible = $ref(false)
const target = ref<HTMLDivElement | null>(null)
useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    // 不管是否锁定都记录isIntersecting，用于解锁时及时更新状态
    visible = isIntersecting

    if (isIntersecting) {
      // TODO 列表锁现在是只增不减，是否要改成不增不减
      if (lock && store.visibleEvents.contains(range, { eventId: id })) { return }
      store.visibleEvents.insert(range, { eventId: id })
    }
    else if (!lock) {
      store.visibleEvents.remove(range)
    }
  },
  {
    root: viewPort,
  },
)
whenever(
  () => !lock,
  () => {
    if (!visible) { store.visibleEvents.remove(range) }
  },
)

const width = $computed(() => range.length * UNIT_WIDTH)
const offset = $computed(() => {
  const zero = store.origin?.firstChild
  if (!zero) { return undefined }
  return range.start.diff(zero) * UNIT_WIDTH
})
const order = $computed(() => store.visibleEvents.order(range, { eventId: id }))

// 预加载当前可见区域内的event detail
const loadDetail = $computed(() => visibleUnit?.childrenRange.isIntersect(range))

// 删除事件时更新事件时间跨度内所有事件列表缓存
const handleDelete = (range: UnitIDRange, ids: number[]) => {
  store.visibleEvents.remove(range, { eventId: ids[0] })

  for (const id of range.ids) {
    client.setQueryData<EventEntity[]>(
      ['event', { range: id.range.serialize() }],
      events => {
        return events?.filter(event => event.id !== ids[0])
      })
  }

  for (const id of ids) {
    client.invalidateQueries(['event', id])
  }
}
</script>

<template>
  <EventDetailCardTrigger :id="id" :enabled="loadDetail">
    <EventContextMenu :id="id" @delete="handleDelete">
      <div
        ref="target"
        name="eventblock"
        :style="{
          left: offset && `${offset}px`,
          transform: `translateY(${order * EVENT_HEIGHT}px)`,
        }"
        absolute cursor-pointer
        transition-transform duration-100
        z-10 hover:z-100
      >
        <div
          v-if="false"
          :style="{ width: `${UNIT_WIDTH}px`, height: `${EVENT_HEIGHT}px` }"
          center
        >
          <div
            :style="{
              width: `${EVENT_HEIGHT * 0.6}px`,
              height: `${EVENT_HEIGHT * 0.6}px`,
              backgroundColor: color,
            }"
            rounded-full
          />
        </div>
        <div
          v-else
          :style="{ width: `${width}px`, height: `${EVENT_HEIGHT}px` }"
          center
        >
          <div
            :style="{ backgroundColor: color }"
            w-full h-80per
            transition shadow hover:shadow-lg
            rounded
            hover:filter-brightness-80
            active:filter-brightness-60
          />
        </div>
      </div>
    </EventContextMenu>
  </EventDetailCardTrigger>
</template>

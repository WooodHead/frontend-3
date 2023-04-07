<script setup lang="ts">
import { useStore } from '../../store'
import DescCard from './desc-card.vue'
import InfoCard from './info-card.vue'
import TitleCard from './title-card.vue'
import DoneButton from './done-button.vue'
import { useEventRemove, useEventUpdate } from '@/api/event'

const store = useStore()
const { eventId, todoDot, relationDot } = storeToRefs(store)

const { mutate: update } = useEventUpdate()
watchEffect(() => {
  if (!eventId.value) { return }

  if (todoDot.value || relationDot.value) {
    update({ id: eventId.value, done: false })
  }
})

const { mutateAsync: remove, isLoading } = useEventRemove()
const handleRemove = async () => {
  if (!eventId.value) { return }
  await remove({ id: eventId.value })
  store.eventId = undefined
}
</script>

<template>
  <div nim-column gap-2>
    <div center-x gap-1>
      <DoneButton grow />
      <LongPressButton
        :loading="isLoading"
        status="danger"
        shrink-0 long
        @press="handleRemove"
      >
        删除事件
        <template #icon>
          <div i-radix-icons-trash></div>
        </template>
      </LongPressButton>
    </div>
    <TitleCard />
    <InfoCard />
    <DescCard />
  </div>
</template>

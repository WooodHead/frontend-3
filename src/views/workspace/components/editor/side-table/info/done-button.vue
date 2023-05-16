<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { useStore } from '../../store'
import api from '@/api/api'
import { useEventUpdate } from '@/api/event'

const store = useStore()
const { eventId, todoDot, relationDot } = storeToRefs(store)

const { data } = useQuery({
  enabled: computed(() => eventId.value !== undefined),
  queryKey: computed(() => ['event', eventId.value]),
  queryFn: () => api.event.get(eventId.value!),
})

const { mutateAsync: update } = useEventUpdate()

const disabled = computed(() =>
  Boolean(
    todoDot.value ||
      relationDot.value ||
      !data.value?.name ||
      !data.value?.description
  )
)

const config = computed(() =>
  data.value?.done
    ? ({
        type: 'primary',
        icon: 'i-radix-icons-check-circled',
        text: '已完成',
      } as const)
    : ({
        type: 'secondary',
        icon: 'i-radix-icons-circle',
        text: '未完成',
      } as const)
)

const handleToggleDone = async () => {
  if (!data.value || !eventId.value) {
    return
  }
  await update({ id: eventId.value, done: !data.value.done })
}
</script>

<template>
  <AButton :type="config.type" :disabled="disabled" @click="handleToggleDone">
    <template #icon>
      <div :class="config.icon"></div>
    </template>
    {{ config.text }}
  </AButton>
</template>

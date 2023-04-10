<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { useStore } from '../../store'
import { useUpdateDesc } from '../query'
import api from '@/api/api'
import { selectEvent, useEventUpdate } from '@/api/event'

const store = useStore()
const { eventId } = storeToRefs(store)

const editContent = ref('')

const { data } = useQuery({
  enabled: computed(() => !!eventId.value),
  queryKey: computed(() => ['event', eventId.value]),
  queryFn: () => api.event.get(eventId.value!),
  select: selectEvent,
})
watch(() => data.value?.description, desc => {
  editContent.value = desc || ''
}, { immediate: true })

const { mutateAsync: update } = useEventUpdate()
const { mutateAsync: updateDesc, isLoading } = useUpdateDesc()

const editable = ref(false)
whenever(() => !editable.value, () => {
  if (!eventId.value) { return }
  update({
    id: eventId.value,
    description: editContent.value,
  })
})
</script>

<template>
  <ACard title="简介" :loading="isLoading" :bordered="false">
    <template #extra>
      <ALink
        :disabled="data?.done"
        @click="eventId && updateDesc({ id: eventId })"
      >
        生成
      </ALink>
      <ALink
        :disabled="data?.done"
        @click="editable = !editable"
      >
        {{ editable ? '保存' : '编辑' }}
      </ALink>
    </template>
    <ATextarea v-if="editable" v-model="editContent" auto-size />
    <div v-else prose leading-6>
      {{ editContent }}
    </div>
  </ACard>
</template>

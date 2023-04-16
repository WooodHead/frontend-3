<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { useStore } from '../../store'
import { useGenerateName } from '../query'
import api from '@/api/api'
import { useEventUpdate } from '@/api/event'

const store = useStore()
const { eventId } = storeToRefs(store)

const name = ref('')
const editable = ref(false)

const { data } = useQuery({
  enabled: computed(() => eventId.value !== undefined),
  queryKey: computed(() => ['event', eventId.value]),
  queryFn: () => api.event.get(eventId.value!),
})
watchEffect(() => {
  if (!data.value) { return }
  name.value = data.value?.name
})

const { mutateAsync: update } = useEventUpdate()
const { mutateAsync: generateName, isLoading } = useGenerateName()

const handleGenerate = async () => {
  if (!eventId.value) { return }
  await generateName({ id: eventId.value })
}
const toggleEditable = async () => {
  editable.value = !editable.value
  if (editable.value || !eventId.value) { return }
  await update({
    id: eventId.value,
    name: name.value,
  })
}
</script>

<template>
  <ACard title="事件名称" :bordered="false" :loading="isLoading">
    <template #extra>
      <ALink
        :disabled="data?.done"
        @click="handleGenerate"
      >
        生成
      </ALink>
      <ALink
        :disabled="data?.done"
        @click="toggleEditable"
      >
        {{ editable ? '保存' : '编辑' }}
      </ALink>
    </template>
    <AInput v-if="editable" v-model="name" @blur="toggleEditable" />
    <span v-else>{{ name }}</span>
  </ACard>
</template>

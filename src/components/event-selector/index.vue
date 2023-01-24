<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import api from '@/api/api'
import type { EventEntity } from '@/api/api-base'

const { userSearch = true, graphSearch = true, modelValue } = defineProps<{
  userSearch?: boolean
  graphSearch?: boolean
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:model-value', value: string): void
  (e: 'select', event: EventEntity): void | Promise<void>
}>()

const { data: searchContent, isLoading: contentLoading } = useQuery({
  queryKey: computed(() => ['event', 'search', 'content', modelValue]),
  cacheTime: 0,
  queryFn: () => api.event.searchContent({ text: modelValue }),
})
const { data: searchName, isLoading: nameLoading } = useQuery({
  queryKey: computed(() => ['event', 'search', 'name', modelValue]),
  cacheTime: 0,
  queryFn: () => api.event.searchEventName({ text: modelValue }),
})

const handleItemClick = (event: EventEntity) => {
  emit('select', event)
  emit('update:model-value', `${event.serial}. ${event.name}`)
}
</script>

<template>
  <div w-full row space-x-1>
    <ASelect
      :model-value="modelValue"
      :allow-search="{ retainInputValue: false }"
      allow-clear
      :loading="contentLoading || nameLoading"
      unmount-on-close
      :search-delay="500"
      :filter-option="false"
      @search="$emit('update:model-value', $event)"
      @clear="$emit('update:model-value', '')"
    >
      <AOptgroup :label="`事件名称中包含 “${modelValue}” 的事件`">
        <AOption
          v-for="{ id } of searchName"
          :key="id"
        >
          <EventDetailItem
            :id="id"
            :button="false"
            event-select
            @click="handleItemClick"
          >
            <template #extra>
              <div text="xs text-2">
                测试
              </div>
            </template>
          </EventDetailItem>
        </AOption>
      </AOptgroup>
      <AOptgroup :label="`事件描述中包含 “${modelValue}” 的事件`">
        <AOption
          v-for="{ id } of searchContent"
          :key="id"
        >
          <EventDetailItem
            :id="id"
            :button="false"
            event-select
            @click="handleItemClick"
          >
            <template #extra>
              <div text="xs text-2">
                测试
              </div>
            </template>
          </EventDetailItem>
        </AOption>
      </AOptgroup>
    </ASelect>
    <AButton v-if="userSearch" title="根据角色查找" shrink-0>
      <template #icon>
        <div i-radix-icons-person text-xl></div>
      </template>
    </AButton>
    <AButton v-if="graphSearch" title="在关系图中查找" shrink-0>
      <template #icon>
        <div i-radix-icons-tokens text-xl></div>
      </template>
    </AButton>
  </div>
</template>

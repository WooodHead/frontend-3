<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import api from '@/api/api'
import type { EventEntity } from '@/api/api-base'

const { userSearch = true, graphSearch = true, modelValue, multiple = false } = defineProps<{
  userSearch?: boolean
  graphSearch?: boolean
  modelValue?: string
  multiple?: boolean
}>()

// 非受控状态下的值
let _modelValue = $ref('')
const computedModelValue = $computed(() => modelValue || _modelValue)

const emit = defineEmits<{
  (e: 'update:model-value', value: string): void
  (e: 'select', event: EventEntity): void | Promise<void>
}>()

const { data: searchContent, isError: contentError } = useQuery({
  enabled: computed(() => computedModelValue.length > 0),
  queryKey: computed(() => ['event', 'search', 'content', computedModelValue]),
  cacheTime: 0,
  queryFn: () => api.event.searchContent({ text: computedModelValue }),
})
const { data: searchName, isError: nameError } = useQuery({
  enabled: computed(() => computedModelValue.length > 0),
  queryKey: computed(() => ['event', 'search', 'name', computedModelValue]),
  cacheTime: 0,
  queryFn: () => api.event.searchEventName({ text: computedModelValue }),
})

const handleItemClick = (event: EventEntity) => {
  emit('select', event)

  const newName = `${event.serial}. ${event.name}`
  _modelValue = newName
  emit('update:model-value', newName)
}

const handleSearch = (value: string) => {
  _modelValue = value
  emit('update:model-value', value)
}

const handleClear = () => {
  _modelValue = ''
  emit('update:model-value', '')
}

// TODO multiple
</script>

<template>
  <div w-full row space-x-1>
    <ASelect
      :model-value="computedModelValue"
      allow-search
      allow-clear
      :multiple="multiple"
      :error="contentError || nameError"
      unmount-on-close
      :search-delay="500"
      :filter-option="false"
      :show-extra-options="false"
      @search="handleSearch"
      @clear="handleClear"
    >
      <AOptgroup
        v-if="searchName?.length ?? 0 > 0"
        :label="`事件名称中包含 “${computedModelValue}” 的事件`"
      >
        <AOption v-for="{ id } of searchName" :key="id">
          <EventDetailItem
            :id="id"
            :button="false"
            event-select
            @click="handleItemClick"
          >
            <template #extra="{ event }">
              <div text="xs text-2" mb-1>
                {{ event?.description }}
              </div>
            </template>
          </EventDetailItem>
        </AOption>
      </AOptgroup>
      <AOptgroup
        v-if="searchContent?.length ?? 0 > 0"
        :label="`事件描述中包含 “${computedModelValue}” 的事件`"
      >
        <AOption v-for="{ id } of searchContent" :key="id">
          <EventDetailItem
            :id="id"
            :button="false"
            event-select
            @click="handleItemClick"
          >
            <template #extra="{ event }">
              <div text="xs text-2" mb-1>
                {{ event?.description }}
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

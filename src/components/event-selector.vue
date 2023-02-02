<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import api from '@/api/api'
import type { EventEntity } from '@/api/api-base'

const { inputValue, eventSelect = false } = defineProps<{
  inputValue?: string
  eventSelect?: boolean
}>()

// 非受控状态下的值
let _inputValue = $ref<string>()
const computedInputValue = $computed(() => inputValue || _inputValue)

const emit = defineEmits<{
  (e: 'update:input-value', value: string | undefined): void
  (e: 'select', event: EventEntity | undefined): void | Promise<void>
}>()

const isString = (value: unknown): boolean => typeof value === 'string' && value.length > 0

const { data: searchContent, isError: contentError } = useQuery({
  enabled: computed(() => isString(computedInputValue)),
  cacheTime: 0, // 用户搜索字符串没必要缓存
  queryKey: computed(() => ['event', 'search', 'content', computedInputValue]),
  queryFn: () => api.event.searchContent({ text: computedInputValue! }),
})
const { data: searchName, isError: nameError } = useQuery({
  enabled: computed(() => isString(computedInputValue)),
  cacheTime: 0,
  queryKey: computed(() => ['event', 'search', 'name', computedInputValue]),
  queryFn: () => api.event.searchEventName({ text: computedInputValue! }),
})

const handleSearch = (value: string) => {
  _inputValue = value
  emit('update:input-value', value)
}

const handleClear = () => {
  _inputValue = undefined
  emit('update:input-value', undefined)
  emit('select', undefined)
}
</script>

<template>
  <div w-full row space-x-1>
    <ASelect
      :input-value="computedInputValue"
      allow-search
      allow-clear
      unmount-on-close
      :search-delay="500"
      :filter-option="false"
      :show-extra-options="false"
      placeholder="在这里选择事件"
      :error="contentError || nameError"
      @update:input-value="handleSearch"
      @clear="handleClear"
      @change="$emit('select', $event)"
    >
      <AOptgroup
        v-if="searchName?.length ?? 0 > 0"
        :label="`事件名称中包含 “${computedInputValue}” 的事件`"
      >
        <AOption v-for="event of searchName" :key="event.id" :value="event" :label="`${event.serial}. ${event.name}`">
          <EventItem
            :id="event.id"
            :event-select="eventSelect"
          >
            <template #extra>
              <div text="xs text-2" mb-1>
                {{ event?.description }}
              </div>
            </template>
          </EventItem>
        </AOption>
      </AOptgroup>
      <AOptgroup
        v-if="searchContent?.length ?? 0 > 0"
        :label="`事件描述中包含 “${computedInputValue}” 的事件`"
      >
        <AOption v-for="event of searchContent" :key="event.id" :value="event" :label="`${event.serial}. ${event.name}`">
          <EventItem
            :id="event.id"
            :event-select="eventSelect"
          >
            <template #extra>
              <div text="xs text-2" mb-1>
                {{ event?.description }}
              </div>
            </template>
          </EventItem>
        </AOption>
      </AOptgroup>
    </ASelect>
  </div>
</template>

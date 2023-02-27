<script setup lang="ts">
import type { EventEntity } from '@/api/api-base'

const { title, ids } = defineProps<{
  title: string
  ids: number[]
}>()

const emit = defineEmits<{
  (e: 'add', id: number): void
  (e: 'remove', id: number): void
}>()

const visible = ref(false)

const handleSelect = (event: EventEntity | undefined) => {
  if (!event) { return }
  emit('add', event.id)
  visible.value = false
}

const handleRemove = (event: EventEntity | undefined) => {
  if (!event) { return }
  emit('remove', event.id)
}
</script>

<template>
  <ACard :title="title" :body-style="{ padding: 0 }">
    <template #extra>
      <ATrigger v-model:popup-visible="visible" trigger="click">
        <AButton :title="`添加${title}`" type="text">
          <template #icon>
            <div i-radix-icons-plus></div>
          </template>
        </AButton>
        <template #content>
          <div card-border p-2>
            <Selector
              event :placeholder="`选择${title}`"
              @select:event="handleSelect"
            />
          </div>
        </template>
      </ATrigger>
    </template>
    <EventItem
      v-for="id of ids"
      :id="id" :key="id"
      button removable
      :remove-text="`移除${title}`"
      @remove="handleRemove"
    />
  </ACard>
</template>

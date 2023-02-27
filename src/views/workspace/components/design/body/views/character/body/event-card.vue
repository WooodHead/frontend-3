<script setup lang="ts">
import type { EventEntity } from '@/api/api-base'

const { ids } = defineProps<{
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
  <ACard w-full title="参与事件" :body-style="{ padding: 0 }">
    <template #extra>
      <ATrigger v-model:popup-visible="visible" trigger="click">
        <AButton type="text">
          <template #icon>
            <div i-radix-icons-plus text-lg></div>
          </template>
        </AButton>
        <template #content>
          <div card-border p-2>
            <Selector
              event placeholder="选择事件"
              @select:event="handleSelect"
            />
          </div>
        </template>
      </ATrigger>
    </template>
    <div max-h-200px overflow-y-auto rounded>
      <EventItem
        v-for="id of ids"
        :id="id" :key="id"
        button removable
        @remove="handleRemove"
      />
    </div>
  </ACard>
</template>

<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import { Message } from '@arco-design/web-vue'
import { UnitIDRange } from '@project-chiral/unit-id'
import type { AxiosError } from 'axios'
import api from '@/api/api'

const { id } = defineProps<{ id: number }>()

const emit = defineEmits<{
  (event: 'delete', range: UnitIDRange, ids: number[]): void | Promise<void>
}>()

const { mutateAsync } = useMutation({
  mutationFn: ({ id, cascade }: { id: number; cascade: boolean }) => api.event.removeEvent(id, { cascade }),
  onSuccess: () => {
    Message.success('删除成功')
  },
  onError: ({ message }: AxiosError) => {
    Message.error(`删除失败：${message}`)
  },
})

const cascadeDelete = ref(false)
const handleDeleteOk = async () => {
  const events = await mutateAsync({ id, cascade: cascadeDelete.value })
  await emit('delete', UnitIDRange.deserialize(events[0].range), [id])
  cascadeDelete.value = false
  return true
}
</script>

<template>
  <ATrigger trigger="contextMenu" align-point>
    <slot></slot>
    <template #content>
      <div absolute card-border w-100px h-auto>
        <APopconfirm @before-ok="handleDeleteOk">
          <AButton rounded-0 long type="text" text-text-1 border="0 b border-2">
            <template #icon>
              <div i-radix-icons-sun></div>
            </template>
            删除
          </AButton>
          <template #content>
            <div mb-2>
              确定删除吗？
            </div>
            <ACheckbox v-model="cascadeDelete">
              同时删除该集合事件的所有子事件
            </ACheckbox>
          </template>
        </APopconfirm>
      </div>
    </template>
  </ATrigger>
</template>

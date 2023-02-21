<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import { Message } from '@arco-design/web-vue'
import type { AxiosError } from 'axios'
import Basic from './index.vue'
import api from '@/api/api'
import type { CharacterEntity } from '@/api/api-base'
const { name } = defineProps<{
  name: string
}>()

const emit = defineEmits<{
  (e: 'close', name: string): void
  (e: 'resolve', name: string, id: number): void
}>()

const visible = ref(false)

const { mutateAsync, isLoading } = useMutation({
  mutationFn: ({ name }: { name: string }) => api.character.create({ name }),
  onSuccess: ({ name }) => {
    Message.success(`角色 ${name} 创建成功`)
  },
  onError: ({ message }: AxiosError) => {
    Message.error(`角色创建失败：${message}`)
  },
})
const handleSelect = (chara: CharacterEntity | undefined) => {
  if (!chara) { return }
  emit('resolve', name, chara.id)
  visible.value = false
}
const handleCreate = async () => {
  const chara = await mutateAsync({ name })
  emit('resolve', name, chara.id)
  visible.value = false
}
</script>

<template>
  <Basic
    v-model:popup-visible="visible"
    @close="$emit('close', name)"
  >
    <template #avatar>
      <div i-radix-icons-question-mark-circled full text-xl></div>
    </template>
    {{ name }}
    <template #popover>
      <div card-border p-2 text-text-1 column gap-2>
        <p>关联已有角色：</p>
        <Selector
          character
          placeholder="选择该名称所关联的角色"
          @select:character="handleSelect"
        />
        <p>或创建新角色：</p>
        <AButton
          long type="primary"
          :loading="isLoading"
          @click="handleCreate"
        >
          <template #icon>
            <div i-radix-icons-plus></div>
          </template>
          创建
        </AButton>
      </div>
    </template>
  </basic>
</template>

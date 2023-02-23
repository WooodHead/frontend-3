<script setup lang="ts">
import Basic from './index.vue'
import type { CharacterEntity } from '@/api/api-base'
import { useCharaCreate } from '@/api/character'
const { name, eventId } = defineProps<{
  name: string
  eventId?: number
}>()

const emit = defineEmits<{
  (e: 'close', name: string): void
  (e: 'resolve', name: string, id: number): void
}>()

const visible = ref(false)

const { mutateAsync, isLoading } = useCharaCreate()
const handleSelect = (chara: CharacterEntity | undefined) => {
  if (!chara) { return }
  emit('resolve', name, chara.id)
  visible.value = false
}
const handleCreate = async () => {
  const chara = await mutateAsync({
    name,
    eventIds: eventId ? [eventId] : [],
  })
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

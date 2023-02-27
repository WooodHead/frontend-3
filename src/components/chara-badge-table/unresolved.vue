<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query'
import Basic from './index.vue'
import type { CharacterEntity } from '@/api/api-base'
import { useCharaConnectEvent, useCharaCreate } from '@/api/character'
const { name, eventId, closable } = defineProps<{
  name: string
  eventId: number
  closable?: boolean
}>()

const emit = defineEmits<{
  (e: 'close', name: string): void
  (e: 'resolve', name: string, id: number): void
}>()

const visible = ref(false)
const charaId = ref<number>()

const client = useQueryClient()
const { mutateAsync: create, isLoading } = useCharaCreate({
  onSuccess: (_chara, { events }) => {
    for (const event of events ?? []) {
      client.invalidateQueries(['event', event])
    }
  },
})
const { mutateAsync: connect } = useCharaConnectEvent(charaId)
const handleConnect = async (chara: CharacterEntity | undefined) => {
  if (!chara) { return }
  charaId.value = chara.id
  await connect({ events: [eventId] })
  emit('resolve', name, chara.id)
  visible.value = false
}
const handleCreate = async () => {
  const chara = await create({
    name,
    events: eventId !== undefined ? [eventId] : undefined,
  })
  emit('resolve', name, chara.id)
  visible.value = false
}
</script>

<template>
  <Basic
    v-model:popup-visible="visible"
    :closable="closable"
    @close="$emit('close', name)"
  >
    <template #avatar>
      <div i-radix-icons-question-mark-circled full text-xl></div>
    </template>
    {{ name }}
    <template #popup>
      <div card-border p-2 text-text-1 column gap-2>
        <p>关联已有角色：</p>
        <Selector
          character
          placeholder="选择该名称所关联的角色"
          @select:character="handleConnect"
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

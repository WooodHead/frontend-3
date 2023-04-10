<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query'
import type { SelectorOptionValue } from '../selector/value'
import Basic from './basic.vue'
import type { CharaOption, CharacterEntity } from '@/api/api-base'
import { useCharaCreate } from '@/api/character'
import { useRelationCreate } from '@/api/graph'
import { PARTICIPATED_IN } from '@/api/graph/schema'
import api from '@/api/api'
const { name, options, eventId, closable, disabled = false } = defineProps<{
  name: string
  options: CharaOption[]
  eventId: number
  closable?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'remove', name: string): void
}>()

const visible = ref(false)

const { mutateAsync: create, isLoading } = useCharaCreate()

const { mutateAsync: connect } = useRelationCreate()
const handleConnect = async (chara: CharacterEntity | undefined) => {
  if (!chara) { return }
  await connect({
    type: PARTICIPATED_IN,
    from: chara.id,
    to: eventId,
  })
  emit('remove', name)
  visible.value = false
}
const handleCreate = async () => {
  await create({ name })
  emit('remove', name)
  visible.value = false
}

const client = useQueryClient()
const selectorOptions = ref<SelectorOptionValue[]>([])
watch(options, async options => {
  const ids = options.map(o => o.id)
  const charas = await Promise.all(ids.map(id => client.ensureQueryData({
    queryKey: ['character', id],
    queryFn: () => api.character.get(id),
  })))
  selectorOptions.value = charas.map(chara => ({
    type: 'character',
    value: chara,
    id: `chara_${chara.id}`,
  }))
}, { immediate: true })
</script>

<template>
  <Basic
    v-model:popup-visible="visible"
    :disabled="disabled"
    :closable="closable"
    @close="$emit('remove', name)"
  >
    <template #avatar>
      <div i-radix-icons-question-mark-circled full text-xl></div>
    </template>
    {{ name }}
    <template #popup>
      <div
        v-if="!disabled"
        card-border p-2 text-text-1 column gap-2
      >
        <p>关联已有角色：</p>
        <Selector
          character
          :default-value="selectorOptions"
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

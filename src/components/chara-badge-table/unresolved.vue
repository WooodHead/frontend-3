<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query'
import Basic from './basic.vue'
import type { CharaEntity } from '@/api/api-base'
import { useCharaCreate, useCharaUpdate } from '@/api/chara'
import { useRelationCreate } from '@/api/graph'
import { PARTICIPATED_IN } from '@/api/graph/schema'
import api from '@/api/api'
const {
  name,
  options,
  eventId,
  closable,
  disabled = false,
} = defineProps<{
  name: string
  options: unknown[]
  eventId: number
  closable?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'remove', name: string): void
}>()

const visible = ref(false)

const client = useQueryClient()
const { mutateAsync: create, isLoading } = useCharaCreate()
const { mutateAsync: update } = useCharaUpdate()
const { mutateAsync: connect } = useRelationCreate()
const handleConnect = async (chara: CharaEntity | undefined) => {
  if (!chara) {
    return
  }

  await connect({
    type: PARTICIPATED_IN,
    from: chara.id,
    to: eventId,
  })

  const { alias } = await client.ensureQueryData({
    queryKey: ['chara', chara.id],
    queryFn: () => api.chara.get(chara.id),
  })

  // 如果别名中没有当前名称，则添加
  if (!alias.includes(name)) {
    await update({
      id: chara.id,
      alias: [...alias, name],
    })
  }

  emit('remove', name)
  visible.value = false
}

const handleCreate = async () => {
  const chara = await create({ name })
  await connect({
    type: PARTICIPATED_IN,
    from: chara.id,
    to: eventId,
  })
  emit('remove', name)
  visible.value = false
}

// TODO selector options
// const client = useQueryClient()
// const selectorOptions = ref<SelectorOptionValue[]>([])
// watch(options, async options => {
//   const ids = options.map(o => o.id)
//   const charas = await Promise.all(ids.map(id => client.ensureQueryData({
//     queryKey: ['chara', id],
//     queryFn: () => api.chara.get(id),
//   })))
//   selectorOptions.value = charas.map(chara => ({
//     type: 'chara',
//     value: chara,
//     id: `chara_${chara.id}`,
//   }))
// }, { immediate: true })
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
      <div v-if="!disabled" card-border p-2 text-text-1 column gap-2>
        <p>关联已有角色：</p>
        <Selector
          chara
          placeholder="选择该名称所关联的角色"
          @select:chara="handleConnect"
        />
        <p>或创建新角色：</p>
        <AButton long type="primary" :loading="isLoading" @click="handleCreate">
          <template #icon>
            <div i-radix-icons-plus></div>
          </template>
          创建
        </AButton>
      </div>
    </template>
  </Basic>
</template>

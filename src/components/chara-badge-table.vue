<script setup lang="ts">
import type { CharacterEntity } from '@/api/api-base'

const { modelValue } = defineProps<{
  modelValue: number[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number[]): void
}>()

const visible = ref(false)
const handleAddChara = (chara: CharacterEntity | undefined) => {
  if (!chara) { return }
  emit('update:modelValue', [...modelValue, chara.id])
  visible.value = false
}
const handleRemoveChara = (id: number) => {
  emit('update:modelValue', modelValue.filter(_id => _id !== id))
}
</script>

<template>
  <div full row flex-wrap gap-1 overflow-y-auto>
    <ATrigger
      v-model:popup-visible="visible"
      trigger="click"
      unmount-on-close
    >
      <template #content>
        <div card-border p-2>
          <Selector
            character
            placeholder="选择要添加的角色"
            @select:character="handleAddChara"
          />
        </div>
      </template>
      <AButton
        square-26px
        border-dashed
        shape="circle"
        type="outline"
      >
        <template #icon>
          <div i-radix-icons-plus></div>
        </template>
      </AButton>
    </ATrigger>
    <CharaBadge
      v-for="id of modelValue"
      :id="id" :key="id"
      closable
      @close="handleRemoveChara"
    />
  </div>
</template>

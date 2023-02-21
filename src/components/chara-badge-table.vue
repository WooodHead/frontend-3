<script setup lang="ts">
import Resolved from './chara-badge-table/resolved.vue'
import Unresolved from './chara-badge-table/unresolved.vue'
import AddButton from './chara-badge-table/add-button.vue'

const { modelValue } = defineProps<{
  modelValue: {
    resolved: number[]
    unresolved: string[]
  }
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: {
    resolved: number[]
    unresolved: string[]
  }): void
}>()

const visible = ref(false)
const handleAdd = (id: number) => {
  emit('update:modelValue', {
    ...modelValue,
    resolved: [...modelValue.resolved, id],
  })
  visible.value = false
}
const handleRemoveSolved = (id: number) => {
  const newResolved = modelValue.resolved.filter(n => n !== id)
  emit('update:modelValue', {
    ...modelValue,
    resolved: newResolved,
  })
}
const handleRemoveUnresolved = (name: string) => {
  const newUnresolved = modelValue.unresolved.filter(n => n !== name)
  emit('update:modelValue', {
    ...modelValue,
    unresolved: newUnresolved,
  })
}
const handleResolve = (name: string, id: number) => {
  const newResolved = [...modelValue.resolved, id]
  const newUnresolved = modelValue.unresolved.filter(n => n !== name)
  emit('update:modelValue', {
    resolved: newResolved,
    unresolved: newUnresolved,
  })
}
</script>

<template>
  <div full row flex-wrap gap-1 overflow-y-auto>
    <AddButton @add="handleAdd" />
    <Resolved
      v-for="id of modelValue.resolved"
      :id="id" :key="id"
      @close="handleRemoveSolved"
    />
    <Unresolved
      v-for="id of modelValue.unresolved"
      :key="id" :name="`${id}`"
      @resolve="handleResolve"
      @close="handleRemoveUnresolved"
    />
  </div>
</template>

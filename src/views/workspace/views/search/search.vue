<script setup lang="ts">
import type { InputInstance } from '@arco-design/web-vue'

const {
  modelValue,
  placeholder,
  buttonText = '搜索',
  loading,
} = defineProps<{
  modelValue?: string
  placeholder?: string
  buttonText?: string
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'clear'): void
  (e: 'search', value: string): void
}>()

const inputRef = ref<InputInstance | null>(null)

defineExpose({
  focus: () => {
    inputRef.value?.focus()
  },
})
</script>

<template>
  <div w-full row>
    <AInput
      ref="inputRef"
      :model-value="modelValue"
      :placeholder="placeholder"
      size="large"
      rounded-r-0
      allow-clear
      @clear="$emit('clear')"
      @update:model-value="$emit('update:modelValue', $event)"
      @press-enter="modelValue && $emit('search', modelValue)"
    />
    <AButton
      :loading="loading"
      type="primary"
      size="large"
      shrink-0
      w-60px
      rounded-l-0
      @click="modelValue && $emit('search', modelValue)"
    >
      {{ buttonText }}
    </AButton>
  </div>
</template>

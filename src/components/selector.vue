<script setup lang="ts">
import type { AxiosError } from 'axios'
import type { SelectOptionData } from '@arco-design/web-vue'
import { Message } from '@arco-design/web-vue'
import type { SelectorOptionValue } from './selector/value'
import CharaNameGroup from './selector/chara-name-group.vue'
import EventNameGroup from './selector/event-name-group.vue'
import EventContentGroup from './selector/event-content-group.vue'
import SceneNameGroup from './selector/scene-name-group.vue'
import type { CharacterEntity, EventEntity, SceneEntity } from '@/api/api-base'

const {
  inputValue,
  modelValue,
  placeholder,
  event = false,
  character = false,
  scene = false,
} = defineProps<{
  inputValue?: string
  modelValue?: SelectorOptionValue
  event?: boolean
  character?: boolean
  scene?: boolean
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:input-value', value: string | undefined): void
  (e: 'update:model-value', value: SelectorOptionValue | undefined): void
  (e: 'select', value: SelectorOptionValue | undefined): void
  (e: 'select:event', event: EventEntity | undefined): void
  (e: 'select:character', character: CharacterEntity | undefined): void
  (e: 'select:scene', scene: SceneEntity | undefined): void
}>()

// 非受控状态下的值
let _inputValue = $ref<string>()
const computedInputValue = $computed(() => inputValue || _inputValue)
let _modelValue = $ref<SelectorOptionValue>()
const computedModelValue = $computed(() => modelValue || _modelValue)

onErrorCaptured<AxiosError>(err => {
  Message.error(err.message)
})

const handleInputUpdate = (value: string) => {
  _inputValue = value
  emit('update:input-value', value)
}

const handleClear = () => {
  _inputValue = undefined
  _modelValue = undefined

  emit('update:input-value', undefined)
  emit('update:model-value', undefined)
  emit('select', undefined)
}

const handleModelUpdate = (rawValue: any) => {
  const value = rawValue as SelectorOptionValue
  _modelValue = value
  emit('select', value)
  emit('update:model-value', value)

  switch (value.type) {
    case 'event':
      emit('select:event', value.value)
      break
    case 'character':
      emit('select:character', value.value)
      break
    case 'scene':
      emit('select:scene', value.value)
      break
  }
}

const handleFallback = (rawValue: any): SelectOptionData => {
  const value = rawValue as SelectorOptionValue
  switch (value.type) {
    case 'event': return { label: `${value.value.serial}. ${value.value.name}`, value }
    default: return { label: value.value.name, value }
  }
}
</script>

<template>
  <Suspense>
    <ASelect
      allow-search
      allow-clear
      :input-value="computedInputValue"
      :model-value="computedModelValue"
      :fallback-option="handleFallback"
      :search-delay="500"
      :filter-option="false"
      :show-extra-options="false"
      :placeholder="placeholder"
      @update:input-value="handleInputUpdate"
      @update:model-value="handleModelUpdate"
      @clear="handleClear"
    >
      <EventNameGroup v-if="event" :input-value="computedInputValue" />
      <EventContentGroup v-if="event" :input-value="computedInputValue" />
      <CharaNameGroup v-if="character" :input-value="computedInputValue" />
      <SceneNameGroup v-if="scene" :input-value="computedInputValue" />
    </ASelect>
  </Suspense>
</template>

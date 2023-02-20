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

const _inputValue = ref<string>() // 非受控状态下的值
const computedInputValue = computed(() => inputValue || _inputValue.value)
const searchValue = refDebounced(computedInputValue, 200) // 手动消抖
const _modelValue = ref<SelectorOptionValue>()
const computedModelValue = computed(() => modelValue || _modelValue.value)

onErrorCaptured<AxiosError>(err => {
  Message.error(err.message)
})

const handleInputUpdate = (value: string) => {
  _inputValue.value = value
  emit('update:input-value', value)
}

const handleClear = () => {
  _inputValue.value = undefined
  _modelValue.value = undefined

  emit('update:input-value', undefined)
  emit('update:model-value', undefined)
  emit('select', undefined)
}

const handleModelUpdate = (rawValue: any) => {
  const value = rawValue as SelectorOptionValue | undefined
  _modelValue.value = value
  emit('select', value)
  emit('update:model-value', value)

  switch (value?.type) {
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

// TODO 多选
// TODO 虚拟滚动
// TODO 选项筛选配置
// TODO modelValue相同id的值更新后不会触发更新
</script>

<template>
  <div row w-full gap-1>
    <Suspense>
      <ASelect
        grow
        allow-search
        allow-clear
        value-key="id"
        :input-value="computedInputValue"
        :model-value="computedModelValue"
        :fallback-option="handleFallback"
        :filter-option="false"
        :show-extra-options="false"
        :placeholder="placeholder"
        @update:input-value="handleInputUpdate"
        @update:model-value="handleModelUpdate"
        @clear="handleClear"
      >
        <EventNameGroup v-if="event" :search-value="searchValue" />
        <EventContentGroup v-if="event" :search-value="searchValue" />
        <CharaNameGroup v-if="character" :search-value="searchValue" />
        <SceneNameGroup v-if="scene" :search-value="searchValue" />
      </ASelect>
    </Suspense>
    <AButton shrink-0>
      <template #icon>
        <div i-radix-icons-mixer-horizontal text-lg></div>
      </template>
    </AButton>
  </div>
</template>

<script setup lang="ts">
import { Motion, Presence } from '@motionone/vue'
import Editor from './editor/index.vue'
import { fadeInOut } from '@/utils/animation'
import GanttIcon from '@/assets/workspace/gantt.png'

const { modelValue } = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>

<template>
  <VDialog
    width="75%" height="75%"
    :model-value="modelValue"
    @update:model-value="(v: boolean) => $emit('update:modelValue', v)"
  >
    <div row full space-x-4>
      <div column justify-center space-y-8>
        <AButton shape="circle" w="64px!" h="64px!" status="danger">
          <template #icon>
            <div i-radix-icons-cross-2 text-8></div>
          </template>
        </AButton>
        <AButton shape="circle" w="64px!" h="64px!">
          <template #icon>
            <img w-32px h-32px :src="GanttIcon">
          </template>
        </AButton>
        <AButton shape="circle" w="64px!" h="64px!" />
        <AButton shape="circle" w="64px!" h="64px!" />
        <AButton shape="circle" w="64px!" h="64px!" />
      </div>
      <Presence>
        <Motion v-bind="fadeInOut" full>
          <component :is="Editor" :props="{ id: '1' }" />
        </Motion>
      </Presence>
    </div>
  </VDialog>
</template>

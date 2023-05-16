<script setup lang="ts">
import EventLink from './event-link.vue'
import { splitAnswer } from './utils'
const { answer } = defineProps<{
  answer?: string
}>()

const emit = defineEmits<{
  (e: 'reset'): void
}>()

const splits = computed(() => (answer ? splitAnswer(answer) : []))
</script>

<template>
  <div w-full>
    <div full center column>
      <div square-60px i-twemoji-light-bulb animate-pulse></div>
      <p whitespace-pre-wrap>
        <template v-for="split in splits" :key="split">
          <EventLink v-if="typeof split === 'number'" :id="split" />
          <span v-else>{{ split }}</span>
        </template>
      </p>
      <div row gap-4>
        <AButton type="primary" size="large" @click="$emit('reset')">
          <template #icon>
            <div i-radix-icons-check></div>
          </template>
          问问别的
        </AButton>
        <AButton size="large">
          <template #icon>
            <div i-radix-icons-reload></div>
          </template>
          再想想？
        </AButton>
      </div>
    </div>
  </div>
</template>

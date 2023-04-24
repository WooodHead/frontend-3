<script setup lang="ts">
import EventLink from './event-link.vue'
import { splitAnswer } from './utils'
const { answer, loading } = defineProps<{
  answer?: string
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'reset'): void
}>()

const splits = computed(() =>
  splitAnswer(`根据{"id": 28}所提供的信息，我认为霍去病赢得河西战役导致了以下结果：
1. 汉朝完全控制了河西地区。
2. 汉朝先后设置了酒泉郡、张掖郡、敦煌郡和武威郡等河西四郡。
3. 河西走廊正式成为中国版图。
4. 打通了汉朝和西域的道路，丝绸之路从此开通。`)
)
</script>

<template>
  <div w-full>
    <div v-if="loading" full center column>
      <div square-60px i-twemoji-thinking-face animate-spin></div>
      <p text-lg>思考中……</p>
    </div>
    <div v-else full center column>
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
          重新生成
        </AButton>
      </div>
    </div>
  </div>
</template>

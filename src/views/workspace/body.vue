<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import { Message } from '@arco-design/web-vue'
import { Motion, Presence } from '@motionone/vue'
import WSComponent from './components/index.vue'
import useWSStore from './store'
import type { ILayout } from './layout'
import { Layout } from './layout'
import api from '@/api/api'
import { fadeInOut } from '@/utils/animation'

const WSStore = useWSStore()

const { suspense } = useQuery({
  staleTime: 0,
  queryKey: ['project', 'workspace', 'layout'],
  queryFn: () => api.project.getWorkspace(),
  select: ({ layout }) => layout as ILayout,
  onSuccess: config => {
    WSStore.layout = config
      ? Layout.deserialize(config)
      : Layout.default()
  },
  onError: ({ response }: AxiosError) => {
    Message.error(
      response
        ? `工作台启动失败：${response.statusText}`
        : '工作台启动失败：网络错误',
    )
  },
})

await suspense()

watch(
  () => WSStore.layout.serialize(),
  layout => { api.project.updateWorkspace({ layout }) },
  { deep: true },
)

// TODO 简单粗暴的组件reload方式
const version = ref(0)
// emitter.on('reload', () => {
//   version.value += 1
// })
</script>

<template>
  <Presence>
    <Motion
      v-bind="fadeInOut"
      relative
      fullscreen grow
      grid="~ cols-2 rows-2"
      gap-4 p-4
    >
      <WSComponent
        v-for="{ id, position, state } in WSStore.components"
        :id="id"
        :key="`${id}_${version}`"
        :position="position"
        :state="state"
      />
    </Motion>
  </Presence>
</template>

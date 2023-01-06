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
import Status from '@/components/status.vue'
import { fadeInOut } from '@/utils/animation'

const WSStore = useWSStore()
const { layout } = $(storeToRefs(WSStore))

const { isSuccess, isLoading, isError } = useQuery({
  queryKey: ['project', 'workspace'],
  retry: (_count, { response }) => response?.status !== 404,
  queryFn: () => api.project.getWorkspaceInfo(),
  select: ({ layout }) => layout,
  onSuccess: config => {
    if (!config || config.length === 0) {
      WSStore.layout = Layout.default()
    }
    else {
      WSStore.layout = Layout.deserialize(config as ILayout)
    }
  },
  onError: ({ response }: AxiosError) => {
    if (response) {
      const { status, statusText } = response
      // 404 时使用默认布局
      if (status === 404) { WSStore.layout = Layout.default() }
      else { Message.error(`工作台启动失败：${statusText}`) }
    }
    else {
      Message.error('工作台启动失败：网络错误')
    }
  },
})

watch(
  () => layout.serialize(),
  layout => { api.project.updateWorkspaceInfo({ layout }) },
  { deep: true },
)
</script>

<template>
  <Presence>
    <div v-if="!isSuccess" fullscreen grow center>
      <Status card w="1/2" h="1/2" :loading="isLoading" :error="isError" />
    </div>
    <Motion
      v-else
      v-bind="fadeInOut"
      :transition="{ duration: 1 }"
      relative
      fullscreen grow
      grid="~ cols-2 rows-2"
      gap-4 p-4
    >
      <WSComponent
        v-for="{ id, position, state } in WSStore.components"
        :id="id"
        :key="id"
        :position="position"
        :state="state"
      />
    </Motion>
  </Presence>
</template>

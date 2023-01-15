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
  queryFn: () => api.project.getWorkspaceInfo(),
  select: ({ layout }) => layout,
  onSuccess: config => {
    WSStore.layout = config
      ? Layout.deserialize(config as ILayout)
      : Layout.default()
  },
  onError: ({ response }: AxiosError) => {
    if (response) {
      Message.error(`工作台启动失败：${response.statusText}`)
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
      <Status card w-1-2 h-1-2 :loading="isLoading" :error="isError" />
    </div>
    <Motion
      v-else
      v-bind="fadeInOut"
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

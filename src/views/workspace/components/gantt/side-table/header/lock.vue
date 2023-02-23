<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { useStore } from '../../store'
import api from '@/api/api'

const store = useStore()
const { lock } = storeToRefs(store)

const { suspense } = useQuery({
  cacheTime: 0,
  queryKey: ['project', 'workspace', 'lock'],
  queryFn: () => api.project.getWorkspace(),
  onSuccess: ({ lock }) => { store.lock = lock },
})

await suspense()

watch(lock, lock => {
  api.project.updateWorkspace({ lock })
})
</script>

<template>
  <AButton
    title="锁定事件列表"
    long h-full
    :type="lock ? `primary` : `outline`"
    @click="lock = !lock"
  >
    <div v-if="lock" i-radix-icons-lock-closed></div>
    <div v-else i-radix-icons-lock-open-1></div>
  </AButton>
</template>

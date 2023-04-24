<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import api from '@/api/api'

const { answer, loading } = defineProps<{
  answer?: string
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'select', value: string): void
}>()

const {
  data: queries,
  isLoading: queriesLoading,
  isFetching: queriesFetching,
  refetch,
} = useQuery({
  enabled: computed(() => !answer && !loading),
  queryKey: ['ai', 'query'],
  queryFn: () =>
    Promise.all(
      Array(3)
        .fill(0)
        .map(() => api.ai.generateQuery())
    ),
})
</script>

<template>
  <div full center column>
    <div
      square-60px
      i-twemoji-smiling-face-with-sunglasses
      animate-bounce
    ></div>
    <p text-lg>有什么问题想要问我吗？</p>
    <p text-lg>可以试试……</p>
    <Status v-if="queriesLoading || queriesFetching" loading square-200px />
    <div v-else w-full column gap-2>
      <AButton
        v-for="randomQuery of queries"
        :key="randomQuery"
        w-full
        p-4px
        h-auto
        whitespace-pre-wrap
        @click="$emit('select', randomQuery)"
      >
        {{ randomQuery }}
      </AButton>
      <ALink @click="() => refetch({})">
        <div i-radix-icons-reload mr-1></div>
        换一批
      </ALink>
    </div>
  </div>
</template>

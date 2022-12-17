<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import eventQuery from '@/api/event'

const { id } = defineProps<{ id: number }>()

const { data } = useQuery({
  ...eventQuery.id(id)._ctx.detail,
})
</script>

<template>
  <div></div>
</template>

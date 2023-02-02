<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import api from '@/api/api'

const { id } = defineProps<{
  id: number
}>()

const { data } = $(useQuery({
  queryFn: () => api.character.getCharacter(id),
}))
</script>

<template>
  1
</template>

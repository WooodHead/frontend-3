<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'

interface EventNodeProps {
  node: NodeProps
}

const { node } = defineProps<EventNodeProps>()
const { id } = $(node)
</script>

<template>
  <div>
    {{ id }}
  </div>
</template>

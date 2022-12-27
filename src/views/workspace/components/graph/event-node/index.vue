<script setup lang="ts">
import type { Node } from '@vue-flow/core'

interface EventNodeProps {
  node: Node
}

const { node } = defineProps<EventNodeProps>()
const { id } = $(node)
</script>

<template>
  <div>
    {{ id }}
  </div>
</template>

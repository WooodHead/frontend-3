<script setup lang="ts">
import { useHandle, useVueFlow } from '@vue-flow/core'
import type { HandleProps, Position } from '@vue-flow/core'

const props = withDefaults(defineProps<HandleProps>(), {
  type: 'source',
  position: 'top' as Position,
  connectable: true,
})

const { id, hooks, connectionStartHandle } = useVueFlow()

const { onMouseDown, onClick } = useHandle({})
</script>

<template>
  <div>1</div>
</template>

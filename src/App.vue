<script lang="ts" setup>
import { DndProvider } from 'vue3-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
</script>

<template>
  <DndProvider :backend="HTML5Backend">
    <div fullscreen text-text-2>
      <RouterView />
    </div>
  </DndProvider>
</template>

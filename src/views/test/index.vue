<script setup lang="ts">
const show = ref(false)
const ids = ref({
  resolved: [114514],
  unresolved: ['1919810'],
})
</script>

<template>
  <div fullscreen center bg-gray-2>
    <div card center w-3-4 h-3-4>
      <div w="75%">
        <LongPressButton />
      </div>
    </div>
  </div>
</template>

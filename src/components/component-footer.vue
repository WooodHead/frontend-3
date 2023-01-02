<script setup lang="ts">

</script>

<template>
  <div row p-2 border="t border-2" min-h-20px>
    <div grow row justify-start>
      <slot name="left"></slot>
    </div>
    <div grow row justify-end>
      <slot name="right"></slot>
    </div>
  </div>
</template>

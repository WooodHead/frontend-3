<script setup lang="ts">

</script>

<template>
  <div row p-2 uno-border="b border-2" min-h-54px>
    <div>
      <slot name="left"></slot>
    </div>
    <div grow>
      <slot name="middle"></slot>
    </div>
    <div>
      <slot name="right"></slot>
    </div>
  </div>
</template>

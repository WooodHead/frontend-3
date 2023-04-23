<script setup lang="ts"></script>

<template>
  <div row px-2 py-1 border="t border-2" h-25px>
    <div grow row justify-start>
      <slot name="left"></slot>
    </div>
    <div grow row justify-end>
      <slot name="right"></slot>
    </div>
  </div>
</template>

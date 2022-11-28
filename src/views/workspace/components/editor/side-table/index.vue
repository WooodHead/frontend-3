<script setup lang="ts">
const tab = $ref(0)
</script>

<template>
  <div
    invisible lg:visible
    uno-border="r-2 gray-200" h-full
  >
    <v-tabs v-bind="tab" color="primary" dark slider-color="primary">
      <v-tab :value="1">
        待办
      </v-tab>
      <v-tab :value="2">
        详细信息
      </v-tab>
      <v-tab :value="3">
        关联
      </v-tab>
    </v-tabs>
  </div>
</template>

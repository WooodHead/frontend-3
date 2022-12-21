<script setup lang="ts">
const tab = $ref(0)
</script>

<template>
  <div uno-border="r-2 gray-200" h-full>
    <!-- <v-tabs v-bind="tab" color="primary" dark slider-color="primary">
      <v-tab :value="1">
        详细信息
      </v-tab>
      <v-tab :value="2">
        待办
      </v-tab>
      <v-tab :value="3">
        关联
      </v-tab>
    </v-tabs> -->
    <ATabs p-2>
      <ATabPane key="1" title="信息">
        1
      </ATabPane>
      <ATabPane key="2" title="待办">
        2
      </ATabPane>
      <ATabPane key="3" title="关联">
        3
      </ATabPane>
    </ATabs>
  </div>
</template>

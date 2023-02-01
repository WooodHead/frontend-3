<script setup lang="ts">
const text = $ref('')
</script>

<template>
  <div w-full row space-x-1>
    <ATreeSelect
      v-model="text"
      allow-search allow-clear
      :tree-props="{ virtualListProps: { height: 200 } }"
    />
    <AButton title="根据角色查找" shrink-0>
      <template #icon>
        <div i-radix-icons-person text-xl></div>
      </template>
    </AButton>
  </div>
</template>

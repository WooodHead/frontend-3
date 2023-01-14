<script setup lang="ts">
</script>

<template>
  <div row space-x-1>
    <ATreeSelect
      :tree-props="{ virtualListProps: { height: 200 } }"
    />
    <AButton title="在关系图中查找" shrink-0>
      <template #icon>
        <div i-radix-icons-tokens text-xl></div>
      </template>
    </AButton>
  </div>
</template>

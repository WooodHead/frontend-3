<script setup lang="ts">
const editable = ref(false)
</script>

<template>
  <ACard title="人物简介">
    <template #extra>
      <AButton
        :type="editable ? 'primary' : 'text'"
        size="small"
        @click="editable = !editable"
      >
        <template #icon>
          <div i-radix-icons-pencil-2 text-lg></div>
        </template>
      </AButton>
    </template>
    <ATextarea :disabled="!editable" />
  </ACard>
</template>

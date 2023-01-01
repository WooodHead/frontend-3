<script setup lang="ts">
const { empty, loading, error } = defineProps<{
  empty?: boolean
  loading?: boolean
  error?: boolean
}>()
</script>

<template>
  <div full>
    <div v-if="empty" center column full>
      <div
        i-radix-icons-info-circled
        text-gray-4
        w-80px h-80px mb-4
      ></div>
      <div text="2xl center" font-semibold>
        这里什么都没有
      </div>
    </div>
    <div v-else-if="error" center column full>
      <div
        i-radix-icons-cross-circled
        text-red-4
        w-80px h-80px
        mb-4
      ></div>
      <div text="2xl center" font-semibold>
        哦！出现问题了
      </div>
    </div>
    <div v-else-if="loading" center full>
      <ASpin :size="64" />
    </div>
  </div>
</template>

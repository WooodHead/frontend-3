<script setup lang="ts">
const {
  duration = 1000,
  long,
  loading = false,
  status = 'normal',
  type = 'secondary',
} = defineProps<{
  duration?: number
  loading?: boolean
  long?: boolean
  status?: 'normal' | 'success' | 'warning' | 'danger' | undefined
  type?: 'dashed' | 'text' | 'outline' | 'primary' | 'secondary' | undefined
}>()

const emit = defineEmits<{
  (e: 'press'): void
}>()

const percent = ref(0)
const step = computed(() => 1 / (duration / 10))
const interval = ref<NodeJS.Timer | null>(null)

const handlePointerDown = () => {
  percent.value = 0
  interval.value = setInterval(() => {
    percent.value += step.value
    if (percent.value >= 1) {
      emit('press')
      percent.value = 0
      clearInterval(interval.value!)
    }
  }, 10)
}

const handlePointerUp = () => {
  clearInterval(interval.value!)
  percent.value = 0
}
</script>

<template>
  <div
    class="wrapper"
    @pointerdown="handlePointerDown"
    @pointerup="handlePointerUp"
  >
    <AButton :long="long" :type="type" :status="status" :loading="loading">
      <template #icon>
        <div square-16px center>
          <slot v-if="percent === 0" name="icon"></slot>
          <AProgress
            v-else
            size="mini"
            type="circle"
            :status="status"
            :percent="percent"
            :show-text="false"
          />
        </div>
      </template>
    </AButton>
  </div>
</template>

<style scoped>
.wrapper :deep(.arco-progress-circle-bar) {
  transition: none;
}
</style>

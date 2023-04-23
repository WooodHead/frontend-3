<script setup lang="ts">
const {
  accept = 'image/*',
  type,
  shape,
  size = 'mini',
} = defineProps<{
  accept?: string
  type?: 'text' | 'dashed' | 'outline' | 'primary' | 'secondary'
  shape?: 'round' | 'circle' | 'square'
  size?: 'mini' | 'medium' | 'large' | 'small'
}>()

const emit = defineEmits<{
  (e: 'before-upload', file: File): Promise<boolean>
}>()

const handleBeforeUpload = async (file: File) => {
  return await emit('before-upload', file)
}
</script>

<template>
  <AUpload
    :accept="accept"
    :show-file-list="false"
    @before-upload="handleBeforeUpload"
  >
    <template #upload-button>
      <AButton :type="type" :shape="shape" :size="size">
        <template #icon>
          <slot name="icon">
            <div i-radix-icons-upload></div>
          </slot>
        </template>
      </AButton>
    </template>
  </AUpload>
</template>

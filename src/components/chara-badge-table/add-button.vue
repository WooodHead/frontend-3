<script setup lang="ts">
import type { CharacterEntity } from '@/api/api-base'

const emit = defineEmits<{
  (e: 'add', id: number): void
}>()

const visible = ref(false)
const handleAddChara = (chara: CharacterEntity | undefined) => {
  if (!chara) { return }
  emit('add', chara.id)
  visible.value = false
}
</script>

<template>
  <ATrigger
    v-model:popup-visible="visible"
    trigger="click"
    unmount-on-close
    :popup-translate="[0, 8]"
  >
    <template #content>
      <div card-border p-2>
        <Selector
          character
          placeholder="选择要添加的角色"
          @select:character="handleAddChara"
        />
      </div>
    </template>
    <AButton
      square-26px
      border-dashed
      shape="circle"
      type="outline"
    >
      <template #icon>
        <div i-radix-icons-plus></div>
      </template>
    </AButton>
  </ATrigger>
</template>

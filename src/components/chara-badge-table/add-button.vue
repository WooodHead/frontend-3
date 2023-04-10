<script setup lang="ts">
import type { CharacterEntity } from '@/api/api-base'
import { useRelationCreate } from '@/api/graph'
import { PARTICIPATED_IN } from '@/api/graph/schema'

const { eventId, disabled = false } = defineProps<{
  eventId: number
  disabled?: boolean
}>()

const visible = ref(false)

const { mutateAsync: connect } = useRelationCreate()
const handleAddChara = async (chara: CharacterEntity | undefined) => {
  if (!chara) { return }
  await connect({
    type: PARTICIPATED_IN,
    from: chara.id,
    to: eventId,
  })
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
      :disabled="disabled"
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

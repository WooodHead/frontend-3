<script setup lang="ts">
import { useStore } from '../../store'

const store = useStore()
const { relationDot, eventId } = storeToRefs(store)
const badges = ref({
  resolved: [114514],
  unresolved: ['1919810'],
})
watch(badges, badges => {
  relationDot.value = badges.unresolved.length !== 0
}, { immediate: true })
</script>

<template>
  <div nim-column space-y-2>
    <ACard title="参与角色">
      <CharaBadgeTable v-if="eventId" v-model="badges" :event-id="eventId" />
    </ACard>
  </div>
</template>

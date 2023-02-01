<script setup lang="ts">
import { useStore } from '../store'
import ObjectSelector from './selector/object.vue'
import SubjectSelector from './selector/subject.vue'
import { registerStore as registerSelStore } from './selector/store'
const { id } = defineProps<{ id: string }>()
const store = useStore()
const selStore = registerSelStore(id)
</script>

<template>
  <div card h-54px mt-4 p-2 row items-center space-x-2>
    <div grow center-y>
      <SubjectSelector />
    </div>
    <div i-radix-icons-arrow-right text-xl></div>
    <div grow center-y>
      <ObjectSelector />
    </div>
    <div center-y>
      <AButton type="outline" title="历史记录">
        <template #icon>
          <div i-radix-icons-counter-clockwise-clock text-lg />
        </template>
      </AButton>
    </div>
  </div>
</template>

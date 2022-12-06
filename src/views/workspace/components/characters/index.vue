<script setup lang="ts">
import type { ComponentProps } from '../index.vue'
import SideTable from './side-table/index.vue'
import Body from './body/index.vue'
import ComponentHeader from '@/components/component-header.vue'

interface CharacterProps {
  props: ComponentProps
}

const { props } = defineProps<CharacterProps>()
const { id, state, position, onClose } = props
</script>

<template>
  <div
    component-light dark:component-dark
    column overflow-hidden
  >
    <ComponentHeader>
      <template #left>
        {{ }}
      </template>
      <template #middle>
        {{}}
      </template>
      <template #right>
        <div row space-x-2>
          {{ }}
        </div>
      </template>
    </ComponentHeader>
    <div row grow>
      <SideTable />
      <Body />
    </div>
  </div>
</template>

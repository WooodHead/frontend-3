<script setup lang="ts">
import type { ComponentProps } from '../index.vue'
import SideTable from './side-table/index.vue'
import Content from './content/index.vue'

interface EditorProps {
  props: ComponentProps
}

const { props } = defineProps<EditorProps>()
const { id, state, position, onClose } = $(props)
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
        {{ }}
      </template>
      <template #right>
        <div row space-x-2>
          <v-btn color="error" variant="text">
            删除
          </v-btn>
          <v-btn color="primary">
            保存
          </v-btn>
        </div>
      </template>
    </ComponentHeader>
    <div row h-0 grow>
      <SideTable />
      <Content />
    </div>
    <ComponentFooter>
      <template #left>
        {{ }}
      </template>
    </ComponentFooter>
  </div>
</template>

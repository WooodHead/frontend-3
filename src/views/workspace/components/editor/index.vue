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
    card
    column overflow-hidden
  >
    <ComponentHeader>
      <template #left>
        {{ }}
      </template>
      <template #middle>
        <ASelect>
          <AOption>
            1
          </AOption>
        </ASelect>
      </template>
      <template #right>
        <div row space-x-2>
          <!-- <v-btn color="error" variant="text">
            删除
          </v-btn> -->
          <a-button type="text" status="danger">
            删除
          </a-button>
          <!-- <v-btn color="primary">
            保存
          </v-btn> -->
          <AButton type="primary">
            保存
          </AButton>
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

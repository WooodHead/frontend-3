<script setup lang="ts">
import type { ComponentStatus } from '../type'
import SideTable from './side-table/index.vue'
import Body from './body/index.vue'
import { registerStore } from './store'

interface CharacterProps {
  status: ComponentStatus
}

const { status } = defineProps<CharacterProps>()

const store = registerStore(status.position)

watch(() => status, status => {
  store.status = status
}, { deep: true })
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
        <ARadioGroup default-value="1" row type="button">
          <ARadio value="1" grow center>
            角色
          </ARadio>
          <ARadio value="2" grow center>
            场景
          </ARadio>
          <ARadio value="3" grow center>
            世界观
          </ARadio>
        </ARadioGroup>
      </template>
      <template #right>
        <div row space-x-2>
          <AButtonGroup type="outline">
            <AButton title="查找">
              <template #icon>
                <div i-radix-icons-magnifying-glass text-2xl />
              </template>
            </AButton>
            <AButton title="筛选">
              <template #icon>
                <div i-radix-icons-mixer-horizontal text-2xl />
              </template>
            </AButton>
          </AButtonGroup>
        </div>
      </template>
    </ComponentHeader>
    <div row grow>
      <SideTable />
      <Body />
    </div>
  </div>
</template>

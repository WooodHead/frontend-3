<script setup lang="ts">
import type { ComponentProps } from '../index.vue'
import SideTable from './side-table/index.vue'
import Body from './body/index.vue'

interface CharacterProps {
  props: ComponentProps
}

const { props } = defineProps<CharacterProps>()
const { id, state, position, onClose } = props
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
            <AButton>
              <template #icon>
                <div i-radix-icons-magnifying-glass text-2xl />
              </template>
            </AButton>
            <AButton>
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

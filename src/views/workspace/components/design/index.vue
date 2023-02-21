<script setup lang="ts">
import type { ComponentStatus } from '../type'
import Body from './body/index.vue'
import { registerStore } from './store'
import Tools from './tools/index.vue'

interface CharacterProps {
  status: ComponentStatus
}

const { status } = defineProps<CharacterProps>()

const store = registerStore(status.positionId)

watch(() => status, status => {
  store.status = status
}, { deep: true })

const id = ref('character')
</script>

<template>
  <div card column overflow-hidden>
    <ComponentHeader>
      <template #middle>
        <ARadioGroup v-model="id" row type="button">
          <ARadio value="character" grow center>
            角色
          </ARadio>
          <ARadio value="scene" grow center>
            场景
          </ARadio>
          <ARadio value="worldview" grow center>
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
    <div relative h-0 grow>
      <Tools />
      <Body :id="id" />
    </div>
  </div>
</template>

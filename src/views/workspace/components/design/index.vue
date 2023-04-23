<script setup lang="ts">
import type { ComponentStatus } from '../type'
import Body from './body/index.vue'
import { registerStore } from './store'

const { status } = defineProps<{
  status: ComponentStatus
}>()

const store = registerStore(status.positionId)

watch(() => status, status => {
  store.status = status
}, { deep: true })

const id = ref('chara')
</script>

<template>
  <div card column overflow-hidden>
    <ComponentHeader>
      <template #middle>
        <ARadioGroup v-model="id" row type="button">
          <ARadio value="chara" grow center>
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
      </template>
    </ComponentHeader>
    <div relative h-0 grow>
      <Body :id="id" />
    </div>
  </div>
</template>

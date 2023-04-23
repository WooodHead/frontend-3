<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import api from '@/api/api'
import type { UnitIDRange } from '@/utils/unit-id'
import { selectChara, useCharaUpdate } from '@/api/chara'

const { id } = defineProps<{
  id?: number
}>()

const { data, suspense } = useQuery({
  enabled: computed(() => id !== undefined),
  queryKey: computed(() => ['chara', id]),
  queryFn: () => api.chara.get(id!),
  select: selectChara,
})
const { mutateAsync: update } = useCharaUpdate()

await suspense()

const model = ref<{
  name?: string
  alias?: string[]
  range?: UnitIDRange
}>({})
watchEffect(() => {
  if (!data.value) { return }
  const { name, alias, range } = data.value
  model.value = {
    name,
    alias,
    range: range ?? undefined,
  }
})

const editable = ref(false)
const toggleEditable = () => {
  editable.value = !editable.value
  if (editable.value) { return }
  const { name, alias, range } = model.value
  update({
    id: data.value!.id,
    name,
    alias,
    ...range?.toJSON(),
  })
}
</script>

<template>
  <ACard title="基本信息" w-full :bordered="false">
    <template #extra>
      <ALink @click="toggleEditable">
        {{ editable ? '保存' : '编辑' }}
      </ALink>
    </template>
    <ADescriptions mt-2 :column="1">
      <ADescriptionsItem label="名称">
        <AInput v-if="editable" v-model="model.name" />
        <span v-else>{{ model.name }}</span>
      </ADescriptionsItem>
      <ADescriptionsItem label="别名">
        <AInputTag v-if="editable" v-model="model.alias" />
        <span v-else>{{ model.alias?.join('、') }}</span>
      </ADescriptionsItem>
      <ADescriptionsItem label="生卒年">
        <UnitRangePicker v-if="editable" v-model="model.range" />
        <span v-else>{{ model.range }}</span>
      </ADescriptionsItem>
    </ADescriptions>
  </ACard>
</template>

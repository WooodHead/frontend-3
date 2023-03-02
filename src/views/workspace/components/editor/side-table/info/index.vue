<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { useStore } from '../../store'
import InfoModal from './info-modal.vue'
import api from '@/api/api'
import { UnitID } from '@/utils/unit-id'
import { useEventRemove } from '@/api/event'

const store = useStore()
const { eventId } = storeToRefs(store)

const { data: event } = useQuery({
  enabled: computed(() => eventId.value !== undefined),
  queryKey: computed(() => ['event', eventId.value]),
  queryFn: () => api.event.get(eventId.value!),
  select: data => ({
    ...data,
    name: `${data.serial}. ${data.name}`,
    range: `${UnitID.fromDayjs(data.unit, data.start)} - ${UnitID.fromDayjs(data.unit, data.end)}`,
  }),
})

const { mutateAsync: remove, isLoading } = useEventRemove(eventId)
const handleRemove = async () => {
  if (eventId.value === undefined) { return }
  await remove()
  store.eventId = undefined
}

const visible = ref(false)
</script>

<template>
  <div nim-column gap-2>
    <InfoModal v-model:visible="visible" />
    <ACard title="基本信息" :bordered="false">
      <template #extra>
        <ALink type="text" @click="visible = true">
          编辑
        </ALink>
      </template>
      <ADescriptions
        :column="1"
        :data="event ? [
          { label: '名称', value: event.name },
          { label: '类型', value: event.type },
          { label: '时间', value: event.range },
        ] : []"
      />
    </ACard>
    <ACard v-if="event?.description" title="简介" :bordered="false">
      <template #extra>
        <ALink>
          编辑
        </ALink>
        <ALink>
          生成
        </ALink>
      </template>
      {{ event.description }}
    </ACard>
    <LongPressButton
      :loading="isLoading" status="danger"
      shrink-0 long
      @press="handleRemove"
    >
      删除事件
      <template #icon>
        <div i-radix-icons-trash></div>
      </template>
    </LongPressButton>
  </div>
</template>

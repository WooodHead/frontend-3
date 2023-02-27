<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import InfoModal from './info-modal.vue'
import DescCard from './description.vue'
import EventCard from './event-card.vue'
import api from '@/api/api'
import { useCharaConnectEvent, useCharaDisconnectEvent } from '@/api/character'

const { id } = defineProps<{
  id?: number
}>()
const { data, isSuccess, isLoading, isError } = useQuery({
  enabled: computed(() => id !== undefined),
  queryKey: computed(() => ['character', id, 'detail']),
  queryFn: () => api.character.getDetail(id!),
})

const avatarName = computed(() => {
  const name = data.value?.name
  if (!name) { return undefined }
  return name.includes(' ') ? name.split(' ')[0] : name.slice(-2)
})

const modalVisible = ref(false)

const { mutate: connect } = useCharaConnectEvent(computed(() => id))
const { mutate: disconnect } = useCharaDisconnectEvent(computed(() => id))
</script>

<template>
  <Status v-if="!isSuccess" :empty="id === undefined" :loading="isLoading" :error="isError" />
  <div v-else p-4 center-y gap-2>
    <div center-x gap-4 m-4>
      <AAvatar :size="48" trigger-type="mask">
        {{ avatarName }}
        <template #trigger-icon>
          <div i-radix-icons-pencil-2 text-lg></div>
        </template>
      </AAvatar>
      <div column>
        <div text="2xl text-1" font-semibold>
          {{ data?.name }}
        </div>
        <div text="sm text-3">
          {{ data?.alias.join(', ') }}
        </div>
      </div>
    </div>
    <ADivider />
    <ACard title="基本信息" w-full>
      <template #extra>
        <ALink @click="modalVisible = true">
          编辑
        </ALink>
      </template>
      <ADescriptions
        mt-2
        :data="[
          {
            label: '姓名',
            value: data?.name ?? '',
          },
        ]"
      />
    </ACard>
    <DescCard w-full />
    <EventCard
      :ids="data?.events ?? []"
      @add="connect({ events: [$event] })"
      @remove="disconnect({ events: [$event] })"
    />
  </div>
  <InfoModal
    v-if="id" :id="id"
    v-model:visible="modalVisible"
  />
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import InfoModal from './info-modal.vue'
import DescCard from './description.vue'
import EventCard from './event-card.vue'
import api from '@/api/api'
import { useCharaConnectEvent, useCharaDisconnectEvent, useCharaUpdate } from '@/api/character'
import { useFileUpload } from '@/api/file'

const { id } = defineProps<{
  id?: number
}>()
const { data, isSuccess, isLoading, isError } = useQuery({
  enabled: computed(() => id !== undefined),
  queryKey: computed(() => ['character', id, 'detail']),
  queryFn: () => api.character.getDetail(id!),
  select: data => ({
    ...data,
    avatar: data.avatar && `${import.meta.env.VITE_BASE_URL}/${data.avatar}`,
  }),
})

const avatarName = computed(() => {
  const name = data.value?.name
  if (!name) { return undefined }
  return name.includes(' ') ? name.split(' ')[0] : name.slice(-2)
})

const modalVisible = ref(false)

const { mutateAsync: update } = useCharaUpdate(computed(() => id))
const { mutate: connect } = useCharaConnectEvent(computed(() => id))
const { mutate: disconnect } = useCharaDisconnectEvent(computed(() => id))

const { mutateAsync: upload } = useFileUpload()
const handleUploadAvatar = async (file: File) => {
  const avatar = await upload({ file, position: `chara_${id}/avatar` })
  await update({ avatar })
  return true
}
</script>

<template>
  <Status v-if="!isSuccess" :empty="id === undefined" :loading="isLoading" :error="isError" />
  <div v-else center-y gap-2>
    <div center-x gap-4 m-4>
      <AAvatar :size="48">
        <img v-if="data?.avatar" :src="data.avatar">
        <div v-else>
          {{ avatarName }}
        </div>
        <template #trigger-icon>
          <UploadButton
            shape="circle" size="mini"
            @before-upload="handleUploadAvatar"
          />
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
    <ACard v-if="data" title="基本信息" w-full :bordered="false">
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
            value: data.name,
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

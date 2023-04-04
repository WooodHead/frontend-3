<script setup lang="ts">
import InfoModal from './info-modal.vue'
import DescCard from './description.vue'
import EventCard from './event-card.vue'
import { useCharaQuery, useCharaUpdate } from '@/api/character'
import { useFileUpload } from '@/api/file'
import { useRelationCreate, useRelationRemove, useRelationsQuery } from '@/api/graph'
import { CHARA, PARTICIPATED_IN } from '@/api/graph/schema'

const { id } = defineProps<{
  id?: number
}>()
const { data, isSuccess, isLoading, isError } = useCharaQuery(computed(() => id))

const { data: relations } = useRelationsQuery(computed(() => id ? { type: CHARA, id } : undefined))
const events = computed(() => relations.value?.PARTICIPATED_IN.to ?? [])

const avatarName = computed(() => {
  const name = data.value?.name
  if (!name) { return undefined }
  return name.includes(' ') ? name.split(' ')[0] : name.slice(-2)
})

const modalVisible = ref(false)

const { mutateAsync: update } = useCharaUpdate()

const { mutateAsync: connect } = useRelationCreate()
const handleAddEvent = async (eventId: number) => {
  if (!id) { return }
  await connect({
    type: PARTICIPATED_IN,
    from: id,
    to: eventId,
  })
}
const { mutateAsync: disconnect } = useRelationRemove()
const handleRemoveEvent = async (eventId: number) => {
  if (!id) { return }
  await disconnect({
    type: PARTICIPATED_IN,
    from: id,
    to: eventId,
  })
}

const { mutateAsync: upload } = useFileUpload()
const handleUploadAvatar = async (file: File) => {
  if (!id) { return }
  const avatar = await upload({ file, position: `chara_${id}/avatar` })
  await update({ id, avatar })
  return true
}
</script>

<template>
  <Status v-if="!isSuccess" :empty="id === undefined" :loading="isLoading" :error="isError" />
  <div v-else center-y gap-2 p-2>
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
      :ids="events"
      @add="handleAddEvent"
      @remove="handleRemoveEvent"
    />
  </div>
  <InfoModal
    v-if="id" :id="id"
    v-model:visible="modalVisible"
  />
</template>

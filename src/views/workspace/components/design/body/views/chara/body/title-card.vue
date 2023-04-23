<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import api from '@/api/api'
import { selectChara, useCharaUpdate } from '@/api/chara'
import { useFileUpload } from '@/api/file'

const { id } = defineProps<{
  id?: number
}>()

const { data, suspense } = useQuery({
  enabled: computed(() => id !== undefined),
  queryKey: computed(() => ['chara', id]),
  queryFn: () => api.chara.get(id!),
  select: selectChara,
})

await suspense()

const { mutateAsync: update } = useCharaUpdate()
const { mutateAsync: upload } = useFileUpload()
const handleUploadAvatar = async (file: File) => {
  if (!id) {
    return
  }
  const avatar = await upload({ file, position: `chara_${id}/avatar` })
  await update({ id, avatar })
  return true
}
</script>

<template>
  <div center-x gap-4 m-4>
    <AAvatar :size="48">
      <img v-if="data?.avatar" :src="data.avatar" />
      <div v-else>
        {{ data?.avatarName }}
      </div>
      <template #trigger-icon>
        <UploadButton
          shape="circle"
          size="mini"
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
</template>

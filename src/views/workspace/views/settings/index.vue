<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import { Message } from '@arco-design/web-vue'
import api from '@/api/api'
import type { UpdateSettingsDto } from '@/api/api-base'
import type { ApiError } from '@/api/types'

const router = useRouter()

const model = ref({
  lang: 'cn',
})

const { mutateAsync: update } = useMutation({
  mutationFn: (dto: UpdateSettingsDto) => api.project.updateSettings(dto),
  onError: (e: ApiError) => {
    Message.error(`更新失败: ${e.response?.data.message}`)
  },
})
watch(model, async model => {
  await update(model)
}, { deep: true })
</script>

<template>
  <AModal title="设置" default-visible @close="router.back()">
    <AForm :model="model">
      <AFormItem label="语言" field="lang">
        <ARadioGroup v-model="model.lang" type="button">
          <ARadio value="cn">
            中文
          </ARadio>
          <ARadio value="en">
            English
          </ARadio>
        </ARadioGroup>
      </AFormItem>
    </AForm>
  </AModal>
</template>

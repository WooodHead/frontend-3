<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import { Message } from '@arco-design/web-vue'
import Answer from './answer.vue'
import { qaApi } from '@/api/api'
import type { BaseQaDto } from '@/api/api-qa'
import type { ApiError } from '@/api/types'

const router = useRouter()

const answer = ref<string>()

const { mutateAsync: send, isLoading } = useMutation({
  mutationFn: (dto: BaseQaDto) => qaApi.baseQa(dto),
  onError: (e: ApiError) => {
    Message.error(`请求失败：${e.response?.data.message}`)
  },
})

const handleSearch = async (query: string) => {
  answer.value = await send({ query })
}
</script>

<template>
  <div class="modal-container">
    <AModal
      :render-to-body="false"
      default-visible
      simple
      :footer="false"
      column
      @close="router.back()"
    >
      <div center-y w-50vw prose>
        <AInputSearch
          size="large"
          placeholder="输入想要搜索的信息"
          search-button
          button-text="提问"
          allow-clear
          @search="handleSearch"
        />
        <Answer :answer="answer" :loading="isLoading" />
      </div>
    </AModal>
  </div>
</template>

<style scoped>
.modal-container :deep(.arco-modal-simple) {
  padding: 20px;
  width: auto;
}

.modal-container :deep(.arco-modal-header) {
  margin: 0;
}
</style>

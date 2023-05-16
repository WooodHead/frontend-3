<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import { Message } from '@arco-design/web-vue'
import Answer from './answer.vue'
import Empty from './empty.vue'
import Search from './search.vue'
import Loading from './loading.vue'
import type { ApiError } from '@/api/types'
import type { BaseQaDto } from '@/api/api-ai'
import { aiApi } from '@/api/api'

const router = useRouter()

const inputRef = ref<InstanceType<typeof Search> | null>(null)
onMounted(() => {
  // 不加nextTick会导致inputRef是null
  nextTick(() => {
    inputRef.value?.focus()
  })
})

const query = ref<string>()
const answer = ref<string>()

const { mutateAsync: send, isLoading } = useMutation({
  mutationFn: (dto: BaseQaDto) => aiApi.baseQa(dto),
  onError: (e: ApiError) => {
    Message.error(`请求失败：${e.response?.data.message}`)
  },
})

const handleSearch = async (query: string) => {
  answer.value = await send({ query })
}

const handleSelect = (selectedQuery: string) => {
  query.value = selectedQuery
  handleSearch(selectedQuery)
}

const handleReset = () => {
  query.value = undefined
  answer.value = undefined
  inputRef.value?.focus()
}
</script>

<template>
  <div class="modal-container">
    <AModal
      :render-to-body="false"
      default-visible
      unmount-on-close
      simple
      :footer="false"
      column
      @close="router.back()"
    >
      <div center-y w-50vw prose>
        <Search
          ref="inputRef"
          v-model="query"
          placeholder="输入想要搜索的信息"
          button-text="提问"
          @search="handleSearch"
          @clear="handleReset"
        />
        <div w-full pt-4>
          <Loading v-if="isLoading" />
          <Empty v-else-if="answer === undefined" @select="handleSelect" />
          <Answer
            v-else
            :answer="answer"
            :loading="isLoading"
            @reset="handleReset"
          />
        </div>
      </div>
    </AModal>
  </div>
</template>

<style scoped>
.modal-container :deep(.arco-modal-simple) {
  padding: 16px;
  width: auto;
}

.modal-container :deep(.arco-modal-header) {
  margin: 0;
}
</style>

<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div class="modal-container">
    <AModal
      :render-to-body="false"
      default-visible simple :footer="false"
      column
      @close="router.back()"
    >
      <div center-y w-50vw prose>
        <AInput rounded-b-0 w-full h-60px placeholder="输入想要搜索的信息">
          <template #prefix>
            <div i-radix-icons-magnifying-glass text-xl></div>
          </template>
        </AInput>
        <h1 text-center>
          可以尝试问问……
        </h1>
        <div>
        </div>
        <AButton center rounded-lg mb-4 w="[calc(100%-32px)]" h-60px>
          <template #icon>
            😄
          </template>
          “2022年2月4日都发生了什么事情？”
        </AButton>
        <AButton center rounded-lg mb-4 w="[calc(100%-32px)]" h-60px>
          <template #icon>
            🤔️
          </template>
          “皮特在保险柜里放了什么东西？”
        </AButton>
        <AButton center rounded-lg mb-4 w="[calc(100%-32px)]" h-60px>
          <template #icon>
            😯
          </template>
          “皮特和露易丝是什么关系？”
        </AButton>
      </div>
    </AModal>
  </div>
</template>

<style scoped>
.modal-container :deep(.arco-modal-simple) {
  padding: 0;
  width: auto;
}

.modal-container :deep(.arco-modal-header) {
  margin: 0;
}
</style>

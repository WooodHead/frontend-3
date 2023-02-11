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
      <div grow>
        <div text="xl center" font-bold>
          测试用户
        </div>
      </div>
      <div mt-4 w-full row justify-center space-x-2>
        <AButton>退出登录</AButton>
        <AButton type="primary">
          个人中心
        </AButton>
      </div>
    </AModal>
  </div>
</template>

<style scoped>
.modal-container :deep(.arco-modal-simple) {
  padding: 0;
}
</style>

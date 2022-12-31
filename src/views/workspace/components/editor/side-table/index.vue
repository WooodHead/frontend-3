<script setup lang="ts">
const tab = $ref(0)
</script>

<template>
  <div border="r border-2" h-full>
    <ATabs p-2>
      <ATabPane key="1" title="信息">
        <ACard>
          1
        </ACard>
      </ATabPane>
      <ATabPane key="2" title="待办">
        <ACard>
          2
        </ACard>
      </ATabPane>
      <ATabPane key="3" title="关联">
        <ACard>
          3
        </ACard>
      </ATabPane>
    </ATabs>
  </div>
</template>

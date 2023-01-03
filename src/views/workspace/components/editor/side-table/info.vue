<script setup lang="ts">
</script>

<template>
  <ACard title="基本信息">
    <template #extra>
      <ALink type="text">
        修改
      </ALink>
    </template>
    <ADescriptions
      :column="1"
      :data="[
        { label: '名称', value: '测试事件' },
        { label: '类型', value: '集合事件' },
      ]"
    />
  </ACard>
  <ACard title="简介">
    <template #extra>
      <ALink type="text">
        修改
      </ALink>
    </template>
  </ACard>
  <ACard title="简介">
    <template #extra>
      <ALink type="text">
        修改
      </ALink>
    </template>
  </ACard>
  <ACard title="简介">
    <template #extra>
      <ALink type="text">
        修改
      </ALink>
    </template>
  </ACard>
  <ACard title="简介">
    <template #extra>
      <ALink type="text">
        修改
      </ALink>
    </template>
  </ACard>
</template>

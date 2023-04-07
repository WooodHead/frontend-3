<script setup lang="ts">

</script>

<template>
  <ACard title="基本信息" w-full :bordered="false">
    <ADescriptions mt-2 :column="1">
      <ADescriptionsItem label="名称">
        <AInput />
      </ADescriptionsItem>
      <ADescriptionsItem label="别名">
        <div row flex-wrap gap-1>
          <ATag v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" :key="i" closable>
            {{ i }}
          </ATag>
        </div>
      </ADescriptionsItem>
    </ADescriptions>
  </ACard>
</template>

<script setup lang="ts">
const model = $ref({
  name: '',
  description: '',
  graphIds: [] as string[],
})

const validate = async () => {
  console.log('collection')
}

defineExpose({ validate })
</script>

<template>
  <AForm :model="model">
    <AFormItem field="name" label="事件名称" required>
      <AInput v-model="model.name" />
    </AFormItem>
    <AFormItem field="description" label="事件描述">
      <ATextarea v-model="model.description" />
    </AFormItem>
    <!-- TODO 自定义FormItem，支持可视化选择子图 -->
    <AFormItem field="graphIds" label="子关系图" required>
      <ASelect
        v-model:model-value="model.graphIds"
        multiple allow-clear allow-search
      >
        <AOption value="1">
          1
        </AOption>
        <AOption value="2">
          2
        </AOption>
        <AOption value="3">
          3
        </AOption>
      </ASelect>
    </AFormItem>
  </AForm>
</template>

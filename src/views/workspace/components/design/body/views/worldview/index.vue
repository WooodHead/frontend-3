<script setup lang="ts">
</script>

<template>
  <ResizeLayout h-full>
    <template #side>
      <div h-full overflow-y-auto>
        <ATree
          show-line
          :data="[
            {
              title: '1',
              key: '1',
              children: [{ title: '1-1', key: '1-1' },
                         { title: '1-2', key: '1-2' },
                         { title: '1-3', key: '1-3' },
                         { title: '1-4', key: '1-4' },
                         { title: '1-5', key: '1-5' },
                         { title: '1-6', key: '1-6' },
                         { title: '1-7', key: '1-7' },
                         { title: '1-8', key: '1-8' },
                         { title: '1-9', key: '1-9' },
                         { title: '1-10', key: '1-10' }],
            },
            { title: '2', key: '2' },
            { title: '3', key: '3' },
            { title: '4', key: '4' },
            { title: '5', key: '5' },
            { title: '6', key: '6' },
            { title: '7', key: '7' },
            { title: '8', key: '8' },
            { title: '9', key: '9' },
            { title: '10', key: '10' },
          ]"
        />
      </div>
    </template>
    <div p-4>
      世界观设定
    </div>
  </ResizeLayout>
</template>

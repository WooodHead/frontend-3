<script setup lang="ts">
import { Motion, Presence } from '@motionone/vue'
import { fadeInOut } from '@/utils/animation'
import DefaultCover from '@/assets/default-cover.webp'

const { show = true, success, error, loading, cover = DefaultCover, title } = defineProps<{
  show?: boolean
  success?: boolean
  error?: boolean
  loading?: boolean
  cover?: string
  title?: string
}>()
</script>

<template>
  <Presence>
    <Motion v-if="show" v-bind="fadeInOut">
      <Status
        v-if="!success"
        w-300px h-400px card-border
        :loading="loading"
        :error="error"
      />
      <ACard
        v-else
        card-border
        max-w-300px max-h-400px
        overflow-y-auto
        prose text-sm
        @wheel.stop
      >
        <template #cover>
          <div h-102px overflow-hidden>
            <img
              full object-cover
              alt="dessert"
              :src="cover"
            >
          </div>
        </template>
        <ACardMeta :title="title" />
        <slot></slot>
      </ACard>
    </Motion>
  </Presence>
</template>

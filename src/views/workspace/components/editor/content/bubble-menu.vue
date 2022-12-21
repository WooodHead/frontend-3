<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import { BubbleMenu } from '@tiptap/vue-3'

const { editor } = defineProps<{
  editor?: Editor
}>()

// TODO 完成浮动菜单
</script>

<template>
  <BubbleMenu
    v-if="editor"
    :tippy-options="{ duration: 100 }"
    :editor="editor"
  >
    <div card-light row>
      <!-- <v-btn-toggle v-model="options" multiple color="primary">
        <v-btn size="small" variant="text">
          <div class="i-radix-icons-font-bold" text-2xl></div>
        </v-btn>
        <v-btn size="small" variant="text">
          <div class="i-radix-icons-font-italic" text-2xl></div>
        </v-btn>
        <v-btn size="small" variant="text">
          <div class="i-radix-icons-underline" text-2xl></div>
      </v-btn-toggle> -->
      <ATag rounded-r-0 p-4 checkable color="blue">
        <div class="i-radix-icons-font-bold" text-2xl></div>
      </ATag>
      <ATag rounded-0 p-4 checkable color="blue">
        <div class="i-radix-icons-font-italic" text-2xl></div>
      </ATag>
      <ATag rounded-l-0 p-4 checkable color="blue">
        <div class="i-radix-icons-underline" text-2xl></div>
      </ATag>
    </div>
  </BubbleMenu>
</template>

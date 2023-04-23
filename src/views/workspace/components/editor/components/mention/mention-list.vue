<script setup lang="ts">
import type {
  SuggestionKeyDownProps,
  SuggestionProps,
} from '@tiptap/suggestion'

const { suggestion } = defineProps<{
  suggestion: SuggestionProps<any>
}>()

watch(
  () => suggestion,
  (suggestion) => {
    suggestion.command({ id: suggestion.text })
  }
)

const handleKeyDown = (props: SuggestionKeyDownProps) => {
  console.log(props)
}

defineExpose({ handleKeyDown })
</script>

<template>
  <ACard>
    {{ suggestion.items }}
  </ACard>
</template>

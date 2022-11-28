<script setup lang="ts">
onMounted(() => {
  setTimeout(() => {
    document.querySelector('#message')?.remove()
  }, 1000)
})
</script>

<template>
  <v-snackbar
    v-model="value"
  >
    snackbarText
    <v-btn flat color="primary" @click.native="value = false">
      Close
    </v-btn>
  </v-snackbar>
</template>

<template>
  <v-container class="h-100">
    <v-textarea auto-grow variant="plain" autofocus />
  </v-container>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
:deep(.v-field__input::first-line) {
    font-weight: bold !important;
}
</style>
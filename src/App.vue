<template>
  <router-view />
</template>

<script lang="ts" setup>
import { usePrefferedTheme } from "@/composables/usePrefferedTheme";

usePrefferedTheme()
</script>

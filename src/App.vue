<template>
  <router-view />
</template>

<script lang="ts" setup>
import { useNotesStore } from "@/store/notes";
import { onBeforeMount } from "vue";

const { getNotes, setDefaultCurrentNote } = useNotesStore();
onBeforeMount(async () => {
  await getNotes();
  setDefaultCurrentNote();
});
</script>

<template>
  <router-view />
  <v-snackbar v-model="snackbar">
    {{ text }}
    <template v-slot:actions>
      <v-btn variant="text" @click="snackbar = false"> Cancel </v-btn>
      <v-btn color="blue" variant="text" @click="refreshPage()"> Reload </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts" setup>
import { useNotesStore } from "@/store/notes";
import { onBeforeMount, ref } from "vue";
import { registerSW } from "virtual:pwa-register";

const { getNotes, setDefaultCurrentNote } = useNotesStore();
onBeforeMount(async () => {
  await getNotes();
  setDefaultCurrentNote();
});

const snackbar = ref(false);
const text = ref("New content available");

const updateSW = registerSW({
  onNeedRefresh() {
    snackbar.value = true;
  },
});

updateSW();

const refreshPage = () => {
  updateSW();
  snackbar.value = false;
};
</script>

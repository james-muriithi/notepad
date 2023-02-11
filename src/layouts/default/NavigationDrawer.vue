<template>
  <v-navigation-drawer :width="mdAndUp ? 230 : 200" :permanent="smAndUp">
    <template v-slot:prepend>
      <v-list-item lines="two" class="text-right">
        <v-btn icon :size="40" flat :disabled="!notes.length">
          <v-icon icon="mdi-delete" />
        </v-btn>
      </v-list-item>
    </template>

    <v-divider class="mb-3" />

    <v-list density="compact" nav>
      <template v-if="notes.length">
        <v-list-item
          v-for="(note, index) in notes"
          :key="note.id"
          class="px-4 py-3 mx-1 mt-3"
          :active="index === 0"
          value="home"
        >
          <template #title>
            <h3 class="font-weight-bold text-capitalize">{{ note.title }}</h3>
          </template>
          <template #subtitle>
            <p class="mt-1">
              {{ note.content.slice(0, 10) }}
            </p>
          </template>
        </v-list-item>
        <v-divider />
      </template>
      <div class="text-center mt-4" v-else>No notes</div>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import DefaultBar from "./AppBar.vue";
import DefaultView from "./View.vue";
import { useNotesStore } from "@/store/notes";
import { storeToRefs } from "pinia";
import { useDisplay } from 'vuetify';

const store = useNotesStore();
const { notes } = storeToRefs(store);

const { smAndUp,mdAndUp } = useDisplay();

</script>

<style lang="scss" scoped>

</style>
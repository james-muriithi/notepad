<template>
  <v-navigation-drawer
    :width="mdAndUp ? 230 : 200"
    :permanent="isNavigationDrawerPermanent"
    style="position: fixed; bottom: 0;top: 0;"
  >
    <template v-slot:prepend>
      <v-list-item lines="two" class="text-right">
        <v-btn icon :size="40" flat :disabled="!currentNote">
          <v-icon icon="mdi-delete" />
        </v-btn>
      </v-list-item>
    </template>

    <v-divider class="mb-3" />

    <v-list density="compact" nav>
      <template v-if="notes.length">
        <div v-for="{ id, content, title } in notes" :key="id" class="mx-1">
          <v-list-item
            class="px-4 py-3 mt-3"
            :active="currentNote === id"
            value="home"
            @click="currentNote = id"
          >
            <template #title>
              <h3 class="font-weight-bold text-capitalize">{{ title }}</h3>
            </template>
            <template #subtitle>
              <p class="mt-1">
                <template v-if="content.length">
                  {{ content.slice(0, 10) }}
                </template>
                <template v-else>
                  No content
                </template>
              </p>
            </template>
          </v-list-item>
          <v-divider v-if="currentNote !== id" />
        </div>
      </template>
      <div class="text-center mt-4" v-else>No notes</div>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { watch } from "vue";
import { useNotesStore } from "@/store/notes";
import { storeToRefs } from "pinia";
import { useDisplay } from "vuetify";
import { useAppStore } from "@/store/app";

// notes
const notesStore = useNotesStore();
const { notes, currentNote } = storeToRefs(notesStore);

if (!currentNote.value && notes.value.length) {
  currentNote.value = notes.value[0].id;
}

// screen size
const appStore = useAppStore();
const { isNavigationDrawerPermanent } = storeToRefs(appStore);
const { smAndUp, mdAndUp } = useDisplay();

isNavigationDrawerPermanent.value = smAndUp.value;

watch(smAndUp, (smAndUp) => {
  isNavigationDrawerPermanent.value = smAndUp;
});
</script>
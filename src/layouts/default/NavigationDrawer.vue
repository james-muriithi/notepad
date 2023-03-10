<template>
  <v-navigation-drawer
    :width="mdAndUp ? 230 : 200"
    :permanent="isNavigationDrawerPermanent"
    style="position: fixed; bottom: 0; top: 0"
  >
    <template v-slot:prepend>
      <v-list-item lines="two" class="text-right">
        <v-btn
          icon
          :size="40"
          flat
          :disabled="!currentNote"
          @click="deleteNote(currentNote || '')"
          aria-label="Delete note"
        >
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
            @click="setCurrentNote(id)"
            :aria-label="title"
            role="listitem"
          >
            <template #title>
              <h3 class="font-weight-bold text-capitalize">
                {{ title || "New note" }}
              </h3>
            </template>
            <template #subtitle>
              <p class="mt-1 text-light">
                <template v-if="getNoteContent(content).length">
                  {{ getNoteContent(content) }}
                </template>
                <template v-else> No content </template>
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

const { deleteNote } = notesStore;

// screen size
const appStore = useAppStore();
const { isNavigationDrawerPermanent } = storeToRefs(appStore);
const { smAndUp, mdAndUp } = useDisplay();

isNavigationDrawerPermanent.value = smAndUp.value;

watch(smAndUp, (smAndUp) => {
  isNavigationDrawerPermanent.value = smAndUp;
});

const getNoteContent = (content: string): string => {
  const c = content.split("\n").slice(1);
  return c.join("\n");
};

const setCurrentNote = (noteId: string) => {
  if (noteId !== currentNote.value) {
    currentNote.value = noteId;
    notes.value = notes.value.filter(({ id, content }) => {
      if (content.length === 0) deleteNote(id);
      return content.length;
    });
  }
};
</script>
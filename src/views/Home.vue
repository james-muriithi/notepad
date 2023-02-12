<template>
  <v-container class="h-100">
    <v-textarea auto-grow variant="plain" @focus="createNewNote" />
  </v-container>
</template>

<script lang="ts" setup>
import { useNotesStore } from "@/store/notes";
import Note from "@/types/Note";
import { storeToRefs } from "pinia";
import uuid4 from "uuid4";
// store
const store = useNotesStore();

const { notes, currentNote, canCreateANewNote } = storeToRefs(store);

const createNewNote = () => {
  if (!canCreateANewNote.value) return;
  const defaultNote: Note = {
    id: uuid4(),
    title: "New note",
    content: "",
    createdAt: new Date().toISOString(),
  };

  notes.value.unshift(defaultNote);
  currentNote.value = defaultNote.id;
};
</script>

<style lang="scss" scoped>
:deep(.v-field__input::first-line) {
  font-weight: bold !important;
}
</style>
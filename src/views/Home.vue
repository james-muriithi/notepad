<template>
  <v-container class="h-100">
    <v-textarea
      auto-grow
      variant="plain"
      @focus="createNewNoteOnFocus"
      ref="textArea"
      :model-value="currentNoteObject?.content"
      @update:model-value="updateNoteContent"
    />
  </v-container>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ref, Ref, watch, onMounted } from "vue";
import { useNotesStore } from "@/store/notes";

// store
const store = useNotesStore();

const { addNewNote, editNote } = store;
const { currentNoteObject, currentNote } = storeToRefs(store);

// refs
const textArea: Ref<HTMLElement | null> = ref(null);

watch(currentNote, (newValue, oldValue) => {
  if (newValue != oldValue) {
    textArea.value?.focus();
  }
});

const createNewNoteOnFocus = () => {
  if (currentNote.value) return;
  addNewNote();
};

const updateNoteContent = (newContent: string): void => {
  const [title] = newContent.split("\n");
  editNote(title, newContent);
};

onMounted(() => {
  if (currentNote.value) textArea.value?.focus();
});
</script>

<style lang="scss" scoped>
:deep(.v-field__input::first-line) {
  font-weight: bold !important;
}
</style>
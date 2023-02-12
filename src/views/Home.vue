<template>
  <v-container class="h-100">
    <v-textarea
      auto-grow
      variant="plain"
      @focus="addNewNote"
      ref="textArea"
    />
  </v-container>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ref, Ref, watch } from "vue";
import { useNotesStore } from "@/store/notes";

// store
const store = useNotesStore();

const { addNewNote } = store;
const { canCreateANewNote } = storeToRefs(store);

// refs
const textArea:Ref<HTMLElement|null> = ref(null)

watch(canCreateANewNote, (newValue) => {
  if(!newValue) {
    textArea.value?.focus()
  }
})

</script>

<style lang="scss" scoped>
:deep(.v-field__input::first-line) {
  font-weight: bold !important;
}
</style>
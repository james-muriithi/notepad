import { ref, computed, Ref, ComputedRef } from "vue";
import Note from "@/types/Note";
import { defineStore } from "pinia";
import uuid4 from "uuid4";
import { db } from "../db";

export const useNotesStore = defineStore("notes", () => {
  // state
  const notes: Ref<Note[]> = ref([]);

  const currentNote: Ref<string | null> = ref(null);

  // getters
  const currentNoteObject = computed((): Note | undefined => {
    return notes.value.find(({ id }) => currentNote.value === id);
  });

  const canCreateANewNote: ComputedRef<boolean> = computed(() => {
    if (!notes.value.length) return true;
    const currentNoteObject = notes.value.find(
      ({ id }) => currentNote.value === id
    );
    return !!currentNoteObject?.content;
  });

  // actions
  const addNewNote = () => {
    if (!canCreateANewNote.value) return;
    const defaultNote: Note = {
      id: uuid4(),
      title: "",
      content: "",
      createdAt: new Date().getTime(),
    };

    notes.value.unshift(defaultNote);
    currentNote.value = defaultNote.id;

    db.table("notes").put(defaultNote);
  };

  const setDefaultCurrentNote = (): void => {
    if (notes.value.length) {
      currentNote.value = notes.value[0].id;
    }
  };

  const deleteNote = async (noteId: string): Promise<void> => {
    notes.value = notes.value.filter(({ id }) => id !== noteId);
    await db.table('notes').delete(noteId)
    setDefaultCurrentNote();
  };

  const editNote = async(title: string, content: string): Promise<void> => {
    notes.value = notes.value.map((note) => {
      if (currentNote.value === note.id) {
        return {
          ...note,
          title,
          content,
        };
      }
      return note;
    });
    await db.table('notes').update(currentNote.value, {title, content})
  };

  const getNotes = async (): Promise<void> => {
    notes.value = await db.table('notes').toArray() as Note[];
    notes.value.sort((note1, note2) => note2.createdAt - note1.createdAt)
  }

  return {
    notes,
    currentNote,
    canCreateANewNote,
    currentNoteObject,
    addNewNote,
    deleteNote,
    setDefaultCurrentNote,
    editNote,
    getNotes
  };
});

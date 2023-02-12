import { ref, computed, Ref, ComputedRef } from "vue";
import Note from '@/types/Note'
import { defineStore } from 'pinia';
import uuid4 from "uuid4";

export const useNotesStore = defineStore('notes', () => {

    // state
    const notes: Ref<Note[]> = ref([]);

    const currentNote: Ref<string | null> = ref(null)


    // getters
    const canCreateANewNote: ComputedRef<boolean> = computed(() => {
        if (!notes.value.length) return true;
        const currentNoteObject = notes.value.find(({ id }) => currentNote.value === id)
        return !!currentNoteObject?.content
    })

    // actions
    const addNewNote = () => {
        if (!canCreateANewNote.value) return;
        const defaultNote: Note = {
            id: uuid4(),
            title: "New note",
            content: "",
            createdAt: new Date().toISOString(),
        };

        notes.value.unshift(defaultNote);
        currentNote.value = defaultNote.id;
    }

    const setDefaultCurrentNote = (): void => {
        if (!currentNote.value && notes.value.length) {
            currentNote.value = notes.value[0].id;
        }
        currentNote.value = null;
    }

    const deleteNote = (noteId: string|null): void => {
        notes.value = notes.value.filter(({ id }) => id !== noteId);
        setDefaultCurrentNote()
    }

    return { notes, currentNote, canCreateANewNote, addNewNote, deleteNote, setDefaultCurrentNote }
})
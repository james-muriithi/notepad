import { ref, computed, Ref, ComputedRef } from "vue";
import Note from '@/types/Note'
import { defineStore } from 'pinia';
import uuid4 from "uuid4";

export const useNotesStore = defineStore('notes', () => {

    // state
    const notes: Ref<Note[]> = ref([]);

    const currentNote: Ref<string | null> = ref(null)


    // getters
    const currentNoteObject = computed((): Note | undefined => {
        return notes.value.find(({ id }) => currentNote.value === id)
    })

    const canCreateANewNote: ComputedRef<boolean> = computed(() => {
        if (!notes.value.length) return true;
        const currentNoteObject = notes.value.find(({ id }) => currentNote.value === id)
        return !!currentNoteObject?.content
    });

    // actions
    const addNewNote = () => {
        if (!canCreateANewNote.value) return;
        const defaultNote: Note = {
            id: uuid4(),
            title: "",
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

    const deleteNote = (noteId: string | null): void => {
        notes.value = notes.value.filter(({ id }) => id !== noteId);
        setDefaultCurrentNote()
    }

    const editNote = (title: string, content: string): void => {
        notes.value = notes.value.map((note) => {
            if (currentNote.value === note.id) {
                return {
                    ...note,
                    title,
                    content
                }
            }
            return note
        })
    }

    return {
        notes, currentNote, canCreateANewNote, currentNoteObject,
        addNewNote, deleteNote, setDefaultCurrentNote, editNote
    }
})
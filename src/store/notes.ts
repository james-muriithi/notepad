// Utilities
import Note from '@/types/Note'
import { defineStore } from 'pinia';
import uuid4 from "uuid4";

interface State{
    notes: Note[],
    currentNote: string|null,
}

export const useNotesStore = defineStore('notes', {
    state: () : State => ({
        notes: [
            {
                id: uuid4(),
                title: 'testing',
                content: 'lorem ipsum'
            },
            {
                id: uuid4(),
                title: 'testing 2',
                content: 'lorem ipsum'
            }
        ] as Note[],
        currentNote: null
    }),
})
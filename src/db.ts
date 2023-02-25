import Dexie from 'dexie';

export const db = new Dexie('notes');
db.version(2).stores({
  notes: '++id, title, content, createdAt'
});
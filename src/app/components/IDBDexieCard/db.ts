import Dexie, { type EntityTable } from 'dexie';

export const IDB_ID = 'studocu-notes-dexie';
export const IDB_STORE_ID = 'summaries';

export interface Summary {
  id: string;
  title: string;
}

export const db = new Dexie(IDB_ID) as Dexie & {
  [IDB_STORE_ID]: EntityTable<
    Summary,
    'id'
  >;
};

db.version(1).stores({
  [IDB_STORE_ID]: 'id, title'
});

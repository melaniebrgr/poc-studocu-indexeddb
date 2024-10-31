import { useEffect, useState } from "react";

const IDB_ID = 'studocu';
const IDB_COLLECTION_ID = 'notes';
const version = 1;

export const useIDB = () => {
  const [db, setDb] = useState<IDBDatabase | null>(null);
  const [collection, setCollection] = useState<IDBObjectStore | null>(null);
  
  useEffect(() => {
    const NotesIDBOpenRequest = indexedDB.open(IDB_ID, version);
  
    NotesIDBOpenRequest.addEventListener('upgradeneeded', (event: IDBVersionChangeEvent) => {
      // @ts-expect-error i know better
      const db = event.target.result;
      
      setDb(db);
  
      if (db && !db.objectStoreNames.contains(IDB_COLLECTION_ID)) {
        setCollection(db.createObjectStore(IDB_COLLECTION_ID, {
          keyPath: 'id',
        }));
      }
    });
  }, []);

  return { collection, db };
}

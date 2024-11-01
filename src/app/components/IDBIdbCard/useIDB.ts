import { openDB, DBSchema } from 'idb';
import { useEffect, useState } from 'react';

export const IDB_ID = 'studocu-notes-idb';
export const IDB_STORE_ID = 'summaries';

export const version = 1;

export interface Summary {
  id: string;
  title: string;
}

interface DB extends DBSchema {
  // @ts-expect-error no clue
  summaries: {
    id: string;
    title: string;
  }
}

export const useIDB = () => {
  const [db, setDb] = useState(null);
  
  useEffect(() => {
    // @ts-expect-error no clue
    connectDB(IDB_ID, IDB_STORE_ID, setDb);
  }, []);
  
  return { db };
}

const connectDB = async (dbId: string, dbStoreId: typeof IDB_STORE_ID, onOpenedConnection: (db: IDBDatabase) => void) => {
  const db = await openDB<DB>(dbId, version, {
    upgrade(db) {
      db.createObjectStore(dbStoreId, {
        keyPath: 'id',
      });
    },
  });

  // @ts-expect-error no clue
  onOpenedConnection(db);
}
import { useEffect, useState } from "react";

export const IDB_ID = 'studocu';
export const IDB_STORE_ID = 'notes';

export const version = 2;

const connectDB = (dbId: string, dbStoreId: string) => {
  let db, objectStore;

  const openRequest: IDBOpenDBRequest = indexedDB.open(dbId, version);

  openRequest.onerror = () => {
    console.error('>>> DB error', openRequest.error);
  }

  openRequest.onsuccess = () => {
    db = openRequest.result;
    console.info('>>> DB opened', db);
  }

  openRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
    db = openRequest.result;
    console.info(`>>> DB ugraded from ${event.oldVersion} to ${event.newVersion}`, db);

    if (!db.objectStoreNames.contains(dbStoreId)) {
      objectStore = db.createObjectStore(dbStoreId, {
        keyPath: 'id',
      })

      console.info('>>> DB object store created', objectStore);
    }
  };
}

export const useIDB = () => {
  const [db] = useState<IDBDatabase | null>(null);
  
  useEffect(() => {
    connectDB(IDB_ID, IDB_STORE_ID);
  }, []);

  return { db };
}


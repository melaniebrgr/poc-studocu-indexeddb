import { useEffect, useState } from "react";

export const IDB_ID = 'studocu';
export const IDB_STORE_ID = 'notes';

export const version = 2;

const connectDB = (dbId: string, dbStoreId: string, onOpenedConnection: (db: IDBDatabase) => void) => {
  let objectStore;

  const openRequest: IDBOpenDBRequest = indexedDB.open(dbId, version);

  openRequest.onerror = () => {
    console.error('>>> DB error', openRequest.error);
  }

  openRequest.onsuccess = () => {
    const db = openRequest.result;
    onOpenedConnection(db);
    console.info('>>> DB opened', db);
  }

  openRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
    const db = openRequest.result;
    onOpenedConnection(db);
    console.info(`>>> DB ugraded from ${event.oldVersion} to ${event.newVersion}`, db);

    if (!db.objectStoreNames.contains(dbStoreId)) {
      objectStore = db.createObjectStore(dbStoreId, {
        keyPath: 'id',
      })

      console.info('>>> DB object store created', objectStore);
    }
  };
}

export const getTransaction = (db: IDBDatabase | null, mode: IDBTransactionMode) => {
  return db?.transaction(IDB_STORE_ID, mode).objectStore(IDB_STORE_ID);
};

export const useIDB = () => {
  const [db, setDb] = useState<IDBDatabase | null>(null);
  
  useEffect(() => {
    connectDB(IDB_ID, IDB_STORE_ID, setDb);
  }, []);

  return { db };
}
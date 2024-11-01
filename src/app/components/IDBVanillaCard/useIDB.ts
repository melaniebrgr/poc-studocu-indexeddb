import { useEffect, useState } from "react";

export const IDB_ID = 'studocu-notes-vanilla';
export const IDB_STORE_ID = 'summaries';

export const version = 1;

const connectDB = (dbId: string, dbStoreId: string, onOpenedConnection: (db: IDBDatabase) => void) => {
  const openRequest: IDBOpenDBRequest = indexedDB.open(dbId, version);

  openRequest.onerror = () => {
    console.error('>>> DB error', openRequest.error);
  }

  openRequest.onsuccess = () => {
    const db = openRequest.result;
    onOpenedConnection(db);
  }

  openRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
    const db = openRequest.result;
    console.info(`>>> DB ugraded from ${event.oldVersion} to ${event.newVersion}`, db);
    
    if (!db.objectStoreNames.contains(dbStoreId)) {
      db.createObjectStore(dbStoreId, {
        keyPath: 'id',
      })
    }

    onOpenedConnection(db);
  };
}

export const useIDB = () => {
  const [db, setDb] = useState<IDBDatabase | null>(null);
  
  useEffect(() => {
    connectDB(IDB_ID, IDB_STORE_ID, setDb);
  }, []);
  
  return { db };
}

export const getTransaction = (db: IDBDatabase | null, mode: IDBTransactionMode) => {
  // TODO: track if is connecting or version is changing and do not do anything
  return db?.transaction(IDB_STORE_ID, mode).objectStore(IDB_STORE_ID);
};

interface Summary { id: string, title: string }

export const useGetAllSummaries = () => {
  const { db } = useIDB();
  const [summaries, setSummaries] = useState<Summary[]>([]);

  useEffect(() => {
    if (!db) return;
    const txRead = getTransaction(db, 'readonly');
    const request = txRead!.getAll();
    request.onsuccess = () => {
      setSummaries(request.result);
    }
  }, [db]);

  return summaries
}
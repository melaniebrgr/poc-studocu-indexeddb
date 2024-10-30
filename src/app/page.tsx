"use client"

import { useEffect, useState } from "react";

const DB_ID = 'studocu';
const DB_STORE_ID = 'notes';
const version = 1;

export default function Home() {

  const [db, setDb] = useState<IDBDatabase | null>(null);
  const [objectStore, setObjectStore] = useState<IDBObjectStore | null>(null);

  useEffect(() => {
    const NotesIDBOpenRequest = indexedDB.open(DB_ID, version);
  
    NotesIDBOpenRequest.addEventListener('upgradeneeded', (event: IDBVersionChangeEvent) => {
      // @ts-expect-error i know better
      setDb(event!.target!.result);
  
      if (db) {
        if (!db.objectStoreNames.contains(DB_STORE_ID)) {
          setObjectStore(db.createObjectStore(DB_STORE_ID, {
            keyPath: 'id',
          }));
        }
      }
    });
  }, [db]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Hello IndexedDB</h1>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

      </main>     
    </div>
  );
}

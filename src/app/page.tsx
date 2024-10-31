"use client"

import { v4 as uuid } from "uuid";
import { useIDB } from "./hooks/useIDB";
import { useState } from "react";

const IDB_ID = 'studocu';
const IDB_COLLECTION_ID = 'notes';
const version = 1;

export default function Home() {
  const { db } = useIDB();

  const [title, setTitle] = useState('')

  const handleSubmit = (e: React.FormEvent, db: IDBDatabase) => {
    e.preventDefault()

    console.log('Submitted title:', title)

    const tx = db.transaction(IDB_COLLECTION_ID, 'readwrite');
    const txStore = tx.objectStore(IDB_COLLECTION_ID);

    txStore.add({
      id: uuid(),
      title,
    });
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">IDB PoC</h1>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <form onSubmit={(evt) => db && handleSubmit(evt, db)} className="space-y-4">
            <div>
              <label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                title
              </label>{' '}
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title"
                className="mt-1"
                required
              />
            </div>
            <button type="submit" className="w-full bg-primary bg-black hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
              Submit
            </button>
          </form>
        </div>
        <section>
          <h2>Files</h2>
          <ul id="file-list"></ul>
        </section>
        <section>
          <h2>File picked</h2>
          <p id="file-picked"></p>
        </section>
      </main>     
    </div>
  );
}

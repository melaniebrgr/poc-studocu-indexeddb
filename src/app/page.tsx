"use client"

import { useIDB } from "./hooks/useIDB";

export default function Home() {

  useIDB();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Hello IndexedDB</h1>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <form id="form">
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" /><br />
        <label htmlFor="institution">Institution:</label>
        <input type="text" id="institution" name="institution" /><br />
        <label htmlFor="grade">Grade:</label>
        <input type="text" id="grade" name="grade" /><br />
        <label htmlFor="file">File:</label>
        <input type="file" id="file" name="file" /><br />
        <input type="submit" value="Submit" />
      </form>
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

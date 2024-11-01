'use client'

import { useState } from "react";

import { db, IDB_STORE_ID } from "./db";

export default function AddFriendForm() {
  const [title, setTitle] = useState('');

  async function addFriend() {
    await db[IDB_STORE_ID].add({
      id: Date.now().toString(),
      title,
    });
    setTitle('');
  }

  return (
    <>
      Title:
      <input
        type="text"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <button onClick={addFriend}>Add</button>
    </>
  );
}
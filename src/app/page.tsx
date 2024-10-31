"use client"

import { Button } from "@/components/ui/button";
import { useIDB } from "./hooks/useIDB";

export default function Home() {
  useIDB();

  return (
    <main>
      <Button>Click me</Button>
    </main>
  );
}

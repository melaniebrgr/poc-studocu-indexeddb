import IDBVanillaCard from "./components/IDBVanillaCard/IDBVanillaCard";
import IDBDexieCard from "./components/IDBDexieCard/IDBDexieCard";
import IDBIdbCard from "./components/IDBIdbCard/IDBIdb";

export default function Home() {
  return (
    <div className="container mx-auto p-4 space-y-4 max-w-md">
      <IDBVanillaCard />
      <IDBIdbCard />
      <IDBDexieCard />
    </div>
  );
}

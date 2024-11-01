import IDBVanillaCard from "./components/IDBVanillaCard/IDBVanillaCard";
import IDBDexieCard from "./components/IDBDexieCard/IDBDexieCard";

export default function Home() {
  return (
    <div className="container mx-auto p-4 space-y-4 max-w-md">
      <IDBVanillaCard />
      <IDBDexieCard />
    </div>
  );
}

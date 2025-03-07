import { Hero } from "../components/hero";
import { DataGenerator } from "../components/data-generator";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Hero />
      <main className="container mx-auto px-4 py-8">
        <DataGenerator />
      </main>
    </div>
  );
}


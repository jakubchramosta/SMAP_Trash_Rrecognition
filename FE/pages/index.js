import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-full">
      <div className="flex h-full w-full">
        <div className="flex-1 bg-background h-full p-20">
          <h1 className="text-white text-6xl mb-10 font-medium">
            ODPAD DO SPRÁVNÉHO KOŠE!
          </h1>
          <p className="text-white text-xl">
            Vítej ve světě recyklace! Aplikace ti pomůže pochopit, kam patří
            tvůj odpad. Stačí jednoduchá fotka a my ti ukážeme správnou cestu k
            recyklaci. Prozkoumej svět materiálů a jejich správného zpracování.
            Uč se hrou a přispěj k udržitelnější budoucnosti.
          </p>
          <Link href="/detekce">
            <button>ZJISTI, KAM PATŘÍ TVŮ ODPAD!</button>
          </Link>
        </div>
        <div className="flex-1 items-center justify-center">
          <Image src="/images/background.jpeg" width={800} height={800} />
        </div>
      </div>
    </main>
  );
}

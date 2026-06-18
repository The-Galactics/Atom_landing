"use client";

import { Welcome } from "@/components/Welcome";
import { HomeContent } from "@/components/HomeContent";
import { useWelcome } from "@/hooks/useWelcome";

export default function Home() {
  const { showWelcome, enterApp } = useWelcome();

  return (
    <main className="min-h-screen">
      {showWelcome ? (
        <Welcome onEnter={enterApp} />
      ) : (
        <HomeContent />
      )}
    </main>
  );
}

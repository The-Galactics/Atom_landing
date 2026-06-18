import LightPillar from "@/components/ligthBackground";

export const HomeContent = () => {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <section id="hero" className="relative min-h-[calc(100svh-5rem)] overflow-hidden bg-black">
        <LightPillar
          topColor="#000000"
          bottomColor="#777777"
          intensity={2.15}
          rotationSpeed={0.95}
          glowAmount={0.006}
          pillarWidth={3.4}
          pillarHeight={0.42}
          noiseIntensity={0.35}
          pillarRotation={-10}
          interactive
          className="z-0 opacity-90"
        />

        <div className="relative z-10 flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center px-6 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">Hero</h1>
          <p className="mt-4 max-w-xl text-base text-white/70 sm:text-lg">
            bla bla bla
          </p>
        </div>
      </section>
    </div>
  );
};

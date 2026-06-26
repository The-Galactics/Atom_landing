"use client";

import MagicBento from "@/components/Containers";

export default function Containsrs() {
  return (
    <section
      id="containers"
      className="relative w-full bg-black py-16"
    >
      <div className="w-full">
        <div className="mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40">
            Features
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white">
            From Intent to Action
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base text-white/70">
            Atom understands natural language, orchestrates intelligent
            workflows, and executes real actions across your Android ecosystem
            in seconds.
          </p>
        </div>

        <div className="w-full">
          <MagicBento
            enableStars
            enableSpotlight
            enableBorderGlow
            disableAnimations={false}
            particleCount={12}
            enableTilt={false}
            clickEffect
            enableMagnetism
          />
        </div>
      </div>
    </section>
  );
}
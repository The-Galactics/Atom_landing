"use client";

import ScrollFloat from "@/components/ScrollFloat";

export default function AtomIaSection() {
  return (
    <section
      id="atom-ia"
      className="relative flex w-full items-center justify-center bg-black py-32"
    >
      <ScrollFloat
        animationDuration={1}
        ease="back.inOut(2)"
        scrollStart="center bottom+=50%"
        scrollEnd="bottom bottom-=40%"
        stagger={0.03}
        containerClassName="text-center"
      textClassName="font-bold text-white text-[clamp(4rem,15vw,12rem)] tracking-[0.1em]"
      >
        ATOM
      </ScrollFloat>
    </section>
  );
}

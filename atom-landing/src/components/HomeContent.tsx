"use client";

import { BookOpen, Home } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Orb from "@/components/CircleBackgound";
import Dock from "@/components/Dock";
import {
  FlipButton,
  FlipButtonBack,
  FlipButtonFront,
} from "@/components/animate-ui/components/buttons/flip";
import { AvatarGroupDemo } from "@/components/Avatars";
import Containsrs from "@/components/containsrs";
import AtomIaSection from "@/components/AtomIaSection";
import Footer from "@/components/Footer";
import { INSTALL_SECTION_ID } from "@/components/docs/docsContent";


export const HomeContent = () => {
  const router = useRouter();

  const items = [
    {
      icon: <Home size={18} />,
      label: "Home",
      onClick: () =>
        document
          .getElementById("hero")
          ?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      icon: <BookOpen size={18} />,
      label: "Docs",
      onClick: () => router.push("/docs"),
    },
  ];

  return (
    <div className="min-h-screen text-white">
      <section
        id="hero"
        className="relative min-h-svh overflow-hidden bg-black"
      >
        <div className="absolute inset-0 z-0">
          <Orb
            hoverIntensity={2}
            rotateOnHover
            hue={0}
            forceHoverState={false}
            backgroundColor="#000000"
          />
        </div>

        <div className="absolute inset-x-0 top-6 z-20">
          
          <div className="absolute left-10 top-1/2 flex -translate-y-1/2 items-center gap-4">
            <Image
              src="/logoAtomBorder.png"
              alt="Atom logo"
              width={16}
              height={26}
              priority
              className="h-14 w-14 shrink-0 object-contain"
            />

            <span className="text-2xl font-bold tracking-[0.25em] text-white">
              ATOM
            </span>
          </div>

          <div className="relative h-24 w-full ">
            <Dock
              items={items}
              panelHeight={68}
              baseItemSize={50}
              magnification={70}

              
            />

            <div className="pointer-events-none absolute right-10 top-2 z-30 flex flex-col items-center">
              <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                STAFF DEVELOPERS
              </h2>

              <div className="pointer-events-auto">
                <AvatarGroupDemo />
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex min-h-svh flex-col items-center justify-center px-6 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">
            Your Android.
            <br />
            Powered by Intelligence.
          </h1>

          <p className="mt-4 max-w-xl text-base text-white/70 sm:text-lg">
            Atom understands natural language commands and automates complex
            tasks across different Android ecosystems, including OneUI,
            HyperOS, and more.
          </p>

          <div>
            <FlipButton
              onClick={() => router.push(`/docs?section=${INSTALL_SECTION_ID}`)}
              size="lg"
              className="mt-5 rounded-xl shadow-[0_0_24px_rgba(255,255,255,0.28)]"
            >
              <FlipButtonFront className="flex h-10 min-w-28 items-center justify-center gap-2 rounded-lg border border-white/70 bg-white px-4 text-xs font-bold uppercase tracking-[0.1em] text-neutral-950">
                Get started
                <i className="fi fi-br-arrow-right text-sm leading-none"></i>
              </FlipButtonFront>

              <FlipButtonBack className="flex h-10 min-w-28 items-center justify-center gap-2 rounded-lg border border-white bg-neutral-950 px-4 text-xs font-bold uppercase tracking-[0.1em] text-white">
                Explore Atom
              </FlipButtonBack>
            </FlipButton>
          </div>
        </div>
      </section>

      <Containsrs />

      <AtomIaSection />

      <Footer />
    </div>
  );
};
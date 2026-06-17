import { WelcomeProps } from "@/types/welcomeProps";
import { HexagonBackground } from "@/components/animate-ui/components/backgrounds/hexagon";
import { FlipButton, FlipButtonBack, FlipButtonFront, } from "@/components/animate-ui/components/buttons/flip";
import { MorphingTextDemo } from "@/components/morphingText";

export const Welcome = ({ onEnter }: WelcomeProps) => {
  return (
    <HexagonBackground className="absolute inset-0 flex items-center justify-center bg-neutral-950">
      <div className="z-10 flex flex-col items-center gap-8 px-6 text-center">
        <MorphingTextDemo className="max-w-4xl text-5xl font-bold tracking-normal text-white drop-shadow-[0_0_24px_rgba(255,255,255,0.28)] sm:text-6xl md:text-7xl lg:text-8xl" />

      <FlipButton
  onClick={onEnter}
  size="lg"
  className="rounded-xl shadow-[0_0_24px_rgba(255,255,255,0.28)]"
>
  <FlipButtonFront className="h-12 min-w-32 rounded-xl border border-white/70 bg-white px-6 text-sm font-bold uppercase tracking-[0.12em] text-neutral-950">
    Enter
  </FlipButtonFront>

  <FlipButtonBack className="h-12 min-w-32 rounded-xl border border-white bg-neutral-950 px-6 text-sm font-bold uppercase tracking-[0.12em] text-white">
    Start
  </FlipButtonBack>
</FlipButton>
      </div>
    </HexagonBackground>
  );
};

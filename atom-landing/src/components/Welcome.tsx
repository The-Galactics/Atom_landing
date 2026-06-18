import { WelcomeProps } from "@/types/welcomeProps";
import { FlipButton, FlipButtonBack, FlipButtonFront, } from "@/components/animate-ui/components/buttons/flip";
import { MorphingTextDemo } from "@/components/morphingText";
import { StarsBackground } from '@/components/animate-ui/components/backgrounds/stars';

export const Welcome = ({ onEnter }: WelcomeProps) => {
  return (
    <StarsBackground className="absolute inset-0 min-h-dvh">
      <section className="relative z-10 flex min-h-dvh items-center justify-center px-4 py-20 text-center sm:px-6 md:px-10">
        <MorphingTextDemo className="block w-full max-w-[min(92vw,83rem)] text-pretty text-3xl font-bold leading-tight tracking-normal text-white drop-shadow-[0_0_24px_rgba(255,255,255,0.28)] sm:text-4xl md:text-6xl lg:text-7xl" />
      </section>

      <div className="fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+1.5rem)] z-20 flex justify-center px-4 sm:bottom-[calc(env(safe-area-inset-bottom)+2rem)]">
        <FlipButton
          onClick={onEnter}
          size="lg"
          className="rounded-xl shadow-[0_0_24px_rgba(255,255,255,0.28)]"
        >
          <FlipButtonFront className="h-12 min-w-32 rounded-xl border border-white/70 bg-white px-6 text-sm font-bold uppercase tracking-[0.12em] text-neutral-950 sm:h-14 sm:min-w-36">
            Enter
          </FlipButtonFront>

          <FlipButtonBack className="h-12 min-w-32 rounded-xl border border-white bg-neutral-950 px-6 text-sm font-bold uppercase tracking-[0.12em] text-white sm:h-14 sm:min-w-36">
            Start
          </FlipButtonBack>
        </FlipButton>
      </div>
    </StarsBackground>
  );
};

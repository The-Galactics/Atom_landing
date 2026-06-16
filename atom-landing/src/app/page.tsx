import { SlidingNumber } from "@/components/animate-ui/primitives/texts/sliding-number";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center text-6xl font-semibold">
      <SlidingNumber number={2026} inView />
    </div>
  );
}

import Image from 'next/image';

import { MorphingText } from '@/components/animate-ui/primitives/texts/morphing';

const texts = [
  'Advancing automation with artificial intelligence',
  'ATOM',
];

interface MorphingTextDemoProps {
  loop?: boolean;
  holdDelay?: number;
  className?: string;
  text?: string | string[];
}

export const MorphingTextDemo = ({
  loop = true,
  holdDelay = 4000,
  className = 'text-5xl font-semibold text-white md:text-7xl',
  text = texts,
}: MorphingTextDemoProps) => {
  return (
    <MorphingText
      key={`${loop}-${holdDelay}`}
      className={className}
      text={text}
      loop={loop}
      holdDelay={holdDelay}
      suffix={(currentText) =>
        currentText === 'ATOM' ? (
          <Image
            src="/atomLogo.png"
            alt=""
            width={128}
            height={128}
            priority
            className="ml-[0.2em] inline-block size-[1.07em] align-[-0.12em] object-contain"
          />
        ) : null
      }
    />
  );
};

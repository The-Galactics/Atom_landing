'use client';

import * as React from 'react';

import { Sparkles } from '@/components/animate-ui/icons/sparkles';
import { AnimateIcon } from '@/components/animate-ui/icons/icon';

export type AnimateSparklesIconProps = {
  className?: string;
  size?: number;
};

export function AnimateSparklesIcon({
  className,
  size = 128,
}: AnimateSparklesIconProps) {
  return (
    <AnimateIcon
      animateOnView
      animateOnViewOnce={false}
      animateOnHover
      loop
      loopDelay={1000}
    >
      <Sparkles size={size} className={className} />
    </AnimateIcon>
  );
}

